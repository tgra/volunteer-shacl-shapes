import fs from "fs";
import { Parser, Writer, DataFactory } from "n3";
import { pascalCase, camelCase } from "change-case";

const { namedNode, literal } = DataFactory;

// ------------------ CONFIG ------------------
const INPUT = "../../data/shacl-play-convert/volunteer-shapes.ttl";
const SKOS_INPUT = "../../volunteer-schema.ttl"; // SKOS file
const OUTPUT = "output-play.ttl";
const NAME_PREFIX = "volunteer";
const REMOVE_STRING = "-https___ns.volunteeringdata.io_";
const REMOVE_STRING2 = "-shape";
const VOL_NS = "https://solidproject.org/shapes/volunteer#";

// Metadata
const CREATED_DATE = "2026-03-23";
const TERM_STATUS = "testing";
const SOURCE_URL = "https://api.volunteeringdata.io/schema.ttl";
const DERIVED_FROM = SOURCE_URL;

// ------------------ UTILS ------------------
function getObject(subject, predicate, quads) {
  const q = quads.find(
    (x) =>
      x.subject.equals(subject) &&
      x.predicate.value === predicate
  );
  return q ? q.object.value : null;
}

function getObjects(subject, predicate, quads) {
  return quads
    .filter((x) => x.subject.equals(subject) && x.predicate.value === predicate)
    .map((x) => x.object.value);
}

function isType(subject, type, quads) {
  return quads.some(
    (x) =>
      x.subject.equals(subject) &&
      x.predicate.value === "http://www.w3.org/1999/02/22-rdf-syntax-ns#type" &&
      x.object.value === type
  );
}

// Fallback to local name from IRI
function getLocalName(iri) {
  if (iri == null) {
    return null
  }
  return iri.split(/[#/:]/).pop();
}


// Remove unwanted string from an string
function cleanString(iri, removeString) {
  if (!iri) return iri;
  return iri.replace(removeString, "");
}

// ------------------ LOAD TTL ------------------
const ttl = fs.readFileSync(INPUT, "utf8");
const parser = new Parser();
const quads = parser.parse(ttl);

// Collect prefixes from file
let PREFIXES = parser._prefixes || {};
PREFIXES["volunteer-shape"] = VOL_NS;
PREFIXES.sh ??= "http://www.w3.org/ns/shacl#";
PREFIXES.rdfs ??= "http://www.w3.org/2000/01/rdf-schema#";
PREFIXES.skos ??= "http://www.w3.org/2004/02/skos/core#";
PREFIXES.vs ??= "http://www.w3.org/2006/VS/terms/";
PREFIXES.dc ??= "http://purl.org/dc/terms/";
PREFIXES.prov ??= "http://www.w3.org/ns/prov#";
PREFIXES.xsd ??= "http://www.w3.org/2001/XMLSchema#";

// ------------------ LOAD SKOS ------------------
const skosTtl = fs.readFileSync(SKOS_INPUT, "utf8");
const skosParser = new Parser();
const skosQuads = skosParser.parse(skosTtl);



const skosMap = new Map();

for (const q of skosQuads) {
  const s = q.subject.value; // full IRI
  if (!skosMap.has(s)) {
    skosMap.set(s, { prefLabel: null, label: null, definition: null, altLabels: [], broader: [] });
  }
  const entry = skosMap.get(s);
  const p = q.predicate.value;

  if (p === PREFIXES.rdfs + "label") entry.label = q.object.value;
  else if (p === PREFIXES.skos + "prefLabel") entry.prefLabel = q.object.value;
  else if (p === PREFIXES.skos + "definition") entry.definition = q.object.value;
  else if (p === PREFIXES.skos + "altLabel") entry.altLabels.push(q.object.value);
  else if (p === PREFIXES.skos + "broader") entry.broader.push(q.object.value);

  // Fallback so label is always set
  if (!entry.label && entry.prefLabel) entry.label = entry.prefLabel;
}

// Helper to get SKOS entry for a given IRI
function getSkosEntry(iri) {
  
  if (iri == null){
    return null
  }
  return skosMap.get(iri) || null;
}

// ------------------ COLLECT SHAPES ------------------
const subjects = [...new Set(quads.map((q) => q.subject.value))];

const nodeShapes = [];
const propertyShapes = [];

for (const s of subjects) {
  const subject = namedNode(s);
  if (isType(subject, PREFIXES.sh + "NodeShape", quads)) nodeShapes.push(subject);
  if (isType(subject, PREFIXES.sh + "PropertyShape", quads)) propertyShapes.push(subject);
}

// ------------------ MAP IRIs ------------------
const propMap = new Map();
for (const ps of propertyShapes) {
  let label = getObject(ps, PREFIXES.rdfs + "label", quads);
  if (!label) {
    const path = getObject(ps, PREFIXES.sh + "path", quads);
    const skos = path && getSkosEntry(path);
    const cleanedPath = cleanString(path, REMOVE_STRING); // clean path
    label = skos?.prefLabel || getLocalName(cleanedPath) || getLocalName(ps.value);
    label = cleanString(label, REMOVE_STRING);
    label = cleanString(label, REMOVE_STRING2);
  }

  const name = camelCase(label);

  
  let codeIdentifier = name;
  if (["value", "type"].includes(codeIdentifier)) codeIdentifier += "Prop";
  if (!/^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(codeIdentifier)) {
    codeIdentifier = codeIdentifier.replace(/^[^a-zA-Z_$]+/, "").replace(/[^0-9a-zA-Z_$]/g, "");
  }

  const iri = namedNode(VOL_NS + name);
  propMap.set(ps.value, { iri, name, codeIdentifier });
}

const nodeMap = new Map();
for (const ns of nodeShapes) {
  let label = getObject(ns, PREFIXES.rdfs + "label", quads);
  if (!label) {
    const target = getObject(ns, PREFIXES.sh + "targetSubjectsOf", quads);
    const skos = target && getSkosEntry(target);
    const cleanedTarget = cleanString(target, REMOVE_STRING); // clean target
    label = skos?.prefLabel || skos?.label || getLocalName(cleanedTarget) || getLocalName(ns.value);
    label = cleanString(label, REMOVE_STRING);
    label = cleanString(label, REMOVE_STRING2);
  }

  const name = pascalCase(label);

  const iri = namedNode(VOL_NS + name); // name is already cleaned

  let codeIdentifier = pascalCase(`${NAME_PREFIX}${label}`);
  if (["Value", "Type"].includes(codeIdentifier)) codeIdentifier = NAME_PREFIX + codeIdentifier;

  nodeMap.set(ns.value, { iri, name, codeIdentifier });
}

// ------------------ WRITE TTL ------------------
const writer = new Writer({ prefixes: PREFIXES });

// Write PropertyShapes
for (const [oldIRI, { iri, name, codeIdentifier }] of propMap) {
  const subject = namedNode(oldIRI);

  writer.addQuad(iri, namedNode(PREFIXES.sh + "type"), namedNode(PREFIXES.sh + "PropertyShape"));

// Label and comment from SKOS
const target = getObject(subject, PREFIXES.sh + "targetSubjectsOf", quads);
const skos = target && getSkosEntry(target);

const labelValue = skos?.label || getLocalName(subject.value);
writer.addQuad(iri, namedNode(PREFIXES.rdfs + "label"), literal(labelValue));

if (skos?.definition) {
  writer.addQuad(iri, namedNode(PREFIXES.rdfs + "comment"), literal(skos.definition));
}
  
  writer.addQuad(iri, namedNode(PREFIXES.sh + "codeIdentifier"), literal(codeIdentifier));

  // Copy other quads
  for (const q of quads.filter((x) => x.subject.equals(subject))) {
    const p = q.predicate.value;
    if (
      p.endsWith("#label") ||
      p.endsWith("definition") ||
      p.endsWith("comment") ||
      p === PREFIXES.sh + "pattern"
    ) continue;
    writer.addQuad(iri, q.predicate, q.object);
  }
}

// Write NodeShapes
for (const [oldIRI, { iri, name, codeIdentifier }] of nodeMap) {
  const subject = namedNode(oldIRI);

  writer.addQuad(iri, namedNode(PREFIXES.sh + "type"), namedNode(PREFIXES.sh + "NodeShape"));

  // Label and comment from SKOS
const path = getObject(subject, PREFIXES.sh + "path", quads);
const skos = path && getSkosEntry(path);

const labelValue = skos?.label || getLocalName(subject.value);
writer.addQuad(iri, namedNode(PREFIXES.rdfs + "label"), literal(labelValue));

if (skos?.definition) {
  writer.addQuad(iri, namedNode(PREFIXES.rdfs + "comment"), literal(skos.definition));
}

  writer.addQuad(iri, namedNode(PREFIXES.dc + "created"), literal(CREATED_DATE, namedNode(PREFIXES.xsd + "date")));
  writer.addQuad(iri, namedNode(PREFIXES.vs + "term_status"), literal(TERM_STATUS));
  writer.addQuad(iri, namedNode(PREFIXES.dc + "source"), namedNode(SOURCE_URL));
  writer.addQuad(iri, namedNode(PREFIXES.prov + "wasDerivedFrom"), namedNode(DERIVED_FROM));

  // AltLabels
  const altLabels = [
    ...getObjects(subject, PREFIXES.skos + "altLabel", quads),
    ...(getSkosEntry(getObject(subject, PREFIXES.sh + "targetSubjectsOf", quads))?.altLabels || [])
  ];
  for (const alt of altLabels) {
    writer.addQuad(iri, namedNode(PREFIXES.sh + "alternativeName"), literal(alt));
  }

  // Broader
  const broader = [
    ...getObjects(subject, PREFIXES.skos + "broader", quads),
    ...(getSkosEntry(getObject(subject, PREFIXES.sh + "targetSubjectsOf", quads))?.broader || [])
  ];
  for (const b of broader) {
    writer.addQuad(iri, namedNode(PREFIXES.skos + "broader"), namedNode(b));
  }

  // Copy other quads
  for (const q of quads.filter((x) => x.subject.equals(subject))) {
    if (q.predicate.value === PREFIXES.sh + "property" && propMap.has(q.object.value)) {
      writer.addQuad(iri, q.predicate, propMap.get(q.object.value).iri);
    } else if (!q.predicate.value.endsWith("#label") &&
               !q.predicate.value.endsWith("definition") &&
               !q.predicate.value.endsWith("comment")) {
      writer.addQuad(iri, q.predicate, q.object);
    }
  }

  writer.addQuad(iri, namedNode(PREFIXES.sh + "codeIdentifier"), literal(codeIdentifier));
}

// ------------------ OUTPUT ------------------
writer.end((err, result) => {
  if (err) return console.error(err);

  const formatted = result
    .replace(/^(@prefix [^>]+>.)^\n+/g, "$1")
    .replace(/^(volunteer-shapes.*)$/gm, "\n$1");

  fs.writeFileSync(OUTPUT, formatted);
  console.log("Done! Output written to", OUTPUT);
});