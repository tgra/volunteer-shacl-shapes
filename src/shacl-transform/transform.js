import fs from "fs";
import { Parser, Writer, DataFactory } from "n3";
import { pascalCase, camelCase } from "change-case";

const { namedNode, literal } = DataFactory;

// ------------------ CONFIG ------------------
const INPUT = "./shacl-play-convert-output.ttl";
const SKOS_INPUT = "../../volunteer-schema.ttl"; // SKOS file
const OUTPUT = "volunteer.ttl";
const NAME_PREFIX = "volunteer";
const REMOVE_STRING = "-https___ns.volunteeringdata.io_";
const VOL_NS = "https://solidproject.org/shapes/volunteer#";

// Metadata
const CREATED_DATE = "2026-04-01";
const TERM_STATUS = "testing";
const SOURCE_URL = "https://api.volunteeringdata.io/schema.ttl";
const DERIVED_FROM = SOURCE_URL;

// ------------------ UTILS ------------------
function getObject(subject, predicate, quads) {
  const q = quads.find(
    (x) => x.subject.equals(subject) && x.predicate.value === predicate
  );
  return q ? q.object.value : null;
}

function isType(subject, type, quads) {
  return quads.some(
    (x) =>
      x.subject.equals(subject) &&
      x.predicate.value === "http://www.w3.org/1999/02/22-rdf-syntax-ns#type" &&
      x.object.value === type
  );
}

function getLocalName(iri) {
  if (!iri) return null;
  return iri.split(/[#/:]/).pop();
}

function getSkosEntry(iri) {
  if (!iri) return null;
  return skosMap.get(iri) || null;
}

function cleanString(strEdit, removeString) {
  if (!strEdit) return null;
  return String(strEdit)
    .replace(new RegExp(removeString, "g"), "_")
    .replace(/\s+/g, "_");
}

// ------------------ LOAD TTL ------------------
const ttl = fs.readFileSync(INPUT, "utf8");
const parser = new Parser();
const quads = parser.parse(ttl);

// Collect prefixes from file
let PREFIXES = parser._prefixes || {};
PREFIXES["volunteer_shape"] = VOL_NS;
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
  const s = q.subject.value;
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

  if (!entry.label && entry.prefLabel) entry.label = entry.prefLabel;
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
  const path = getObject(ps, PREFIXES.sh + "path", quads);
  const skos = path && getSkosEntry(path);
  let label = getObject(ps, PREFIXES.rdfs + "label", quads) || skos?.label || skos?.prefLabel || getLocalName(ps.value);
  label = cleanString(label, REMOVE_STRING).toLowerCase();
  

  const name = label.toLowerCase().replace(/\s+/g, "_");
  console.log(name)
  let codeIdentifier = name;
  if (["value", "type"].includes(codeIdentifier)) codeIdentifier += "Prop";
  if (!/^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(codeIdentifier)) {
    codeIdentifier = codeIdentifier.replace(/^[^a-zA-Z_$]+/, "").replace(/[^0-9a-zA-Z_$]/g, "");
  }

  const iri = namedNode(VOL_NS + name);
  
  propMap.set(ps.value, { iri, name, codeIdentifier, skos });
}


const nodeMap = new Map();
for (const ns of nodeShapes) {
  const target = getObject(ns, PREFIXES.sh + "targetSubjectsOf", quads);
  const skos = target && getSkosEntry(target);
  let label = getObject(ns, PREFIXES.rdfs + "label", quads) || skos?.label || skos?.prefLabel || getLocalName(ns.value);
  label = cleanString(label, REMOVE_STRING);
  

  const name = pascalCase(label);
  const iri = namedNode(VOL_NS + name);
  let codeIdentifier = pascalCase(`${NAME_PREFIX}${label}`);
  if (["Value", "Type"].includes(codeIdentifier)) codeIdentifier = NAME_PREFIX + codeIdentifier;

  nodeMap.set(ns.value, { iri, name, codeIdentifier, skos });
}

// ------------------ WRITE TTL ------------------
const writer = new Writer({ prefixes: PREFIXES });

function writeShape(iri, quadsForShape, codeIdentifier) {
  // Add type triple
  writer.addQuad(iri, namedNode(PREFIXES.sh + "type"), quadsForShape.type);

  // Label
  if (quadsForShape.label) {
    writer.addQuad(iri, namedNode(PREFIXES.sh + "name"), literal(cleanString(quadsForShape.label, REMOVE_STRING)));
  }

  // Comment / definition
  if (quadsForShape.definition) {
    writer.addQuad(iri, namedNode(PREFIXES.sh + "description"), literal(quadsForShape.definition));
  }

  // Code identifier
  writer.addQuad(iri, namedNode(PREFIXES.sh + "codeIdentifier"), literal(codeIdentifier));

  // Copy other triples
  for (const q of quadsForShape.otherQuads) {
    writer.addQuad(iri, q.predicate, q.object);
  }

  // Flush this shape so it ends with a period
  writer._write("\n"); // <-- Add blank line after each shape
}

// --- Write PropertyShapes ---
for (const [oldIRI, { iri, name, codeIdentifier }] of propMap) {
  const subject = namedNode(oldIRI);
  const typeQuad = { type: namedNode(PREFIXES.sh + "PropertyShape") };
  const label = getObject(subject, PREFIXES.rdfs + "label", quads) || getLocalName(subject.value);
  const definition = null; // or get from SKOS
  const otherQuads = quads.filter(x => x.subject.equals(subject));
  writeShape(iri, { type: typeQuad.type, label, definition, otherQuads }, codeIdentifier);
}

// --- Write NodeShapes ---
for (const [oldIRI, { iri, name, codeIdentifier }] of nodeMap) {
  const subject = namedNode(oldIRI);
  const typeQuad = { type: namedNode(PREFIXES.sh + "NodeShape") };
  const label = getObject(subject, PREFIXES.rdfs + "label", quads) || getLocalName(subject.value);
  const definition = null; // or get from SKOS

  // Map sh:property URLs to PropertyShape IRIs
  const otherQuads = quads
    .filter(x => x.subject.equals(subject))
    .map(q => {
      if (q.predicate.value === PREFIXES.sh + "property") {
        const mappedProp = propMap.get(q.object.value);
        if (mappedProp) {
          return { predicate: q.predicate, object: mappedProp.iri };
        }
      }
      return q;
    });

  writeShape(iri, { type: typeQuad.type, label, definition, otherQuads }, codeIdentifier);
}

// ------------------ OUTPUT ------------------
writer.end((err, result) => {
  if (err) return console.error(err);
  fs.writeFileSync(OUTPUT, result);
  console.log("Done! Output written to", OUTPUT);
});