// enrich-shapes.js
import fs from "fs";
import { Parser, Writer, DataFactory } from "n3";
import { pascalCase, camelCase } from "change-case";

const { namedNode, literal } = DataFactory;

// ------------------ CONFIG ------------------
const INPUT = "../../data/astrea/volunteer-shapes.ttl";
const OUTPUT = "output.ttl";
const NAME_PREFIX = "volunteer";

const VOL_NS = "https://solidproject.org/shapes/volunteer#";

// Metadata
const CREATED_DATE = "2026-03-23";
const TERM_STATUS = "testing";
const SOURCE_URL = "https://api.volunteeringdata.io/schema.ttl";
const DERIVED_FROM = SOURCE_URL;

// Prefixes
const PREFIXES = {
  "volunteer-shapes": VOL_NS,
  sh: "http://www.w3.org/ns/shacl#",
  rdfs: "http://www.w3.org/2000/01/rdf-schema#",
  skos: "http://www.w3.org/2004/02/skos/core#",
  vs: "http://www.w3.org/2006/VS/terms/",
  dc: "http://purl.org/dc/terms/",
  prov: "http://www.w3.org/ns/prov#",
  xsd: "http://www.w3.org/2001/XMLSchema#",
};

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

// ------------------ LOAD TTL ------------------
const ttl = fs.readFileSync(INPUT, "utf8");
const parser = new Parser();
const quads = parser.parse(ttl);

// ------------------ COLLECT SHAPES ------------------
const subjects = [...new Set(quads.map((q) => q.subject.value))];

const nodeShapes = [];
const propertyShapes = [];

for (const s of subjects) {
  const subject = namedNode(s);
  if (isType(subject, "http://www.w3.org/ns/shacl#NodeShape", quads)) {
    nodeShapes.push(subject);
  }
  if (isType(subject, "http://www.w3.org/ns/shacl#PropertyShape", quads)) {
    propertyShapes.push(subject);
  }
}

// ------------------ MAP IRIs ------------------
const propMap = new Map();
for (const ps of propertyShapes) {
  const label = getObject(ps, "http://www.w3.org/2000/01/rdf-schema#label", quads);
  if (!label) continue;

  const name = camelCase(label); // Property names in camelCase
  let codeIdentifier = name;

  // Ensure valid JS identifier
  if (["value", "type"].includes(codeIdentifier)) codeIdentifier += "Prop";
  if (!/^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(codeIdentifier)) {
    codeIdentifier = codeIdentifier.replace(/^[^a-zA-Z_$]+/, "").replace(/[^0-9a-zA-Z_$]/g, "");
  }

  const iri = namedNode(VOL_NS + name);
  propMap.set(ps.value, { iri, name, codeIdentifier });
}

const nodeMap = new Map();
for (const ns of nodeShapes) {
  const label = getObject(ns, "http://www.w3.org/2000/01/rdf-schema#label", quads);
  if (!label) continue;

  const name = pascalCase(label) + "Shape"; // NodeShape names in PascalCase
  let codeIdentifier = pascalCase(`${NAME_PREFIX} ${label}`); // NodeShape codeIdentifier also PascalCase
  if (["Value", "Type"].includes(codeIdentifier)) codeIdentifier += "Node";

  const iri = namedNode(VOL_NS + name);
  nodeMap.set(ns.value, { iri, name, codeIdentifier });
}

// ------------------ WRITE TTL ------------------
const writer = new Writer({ prefixes: PREFIXES });

// Write PropertyShapes
for (const [oldIRI, { iri, name, codeIdentifier }] of propMap) {
  const subject = namedNode(oldIRI);

  writer.addQuad(iri, namedNode(PREFIXES.sh + "type"), namedNode(PREFIXES.sh + "PropertyShape"));

  const label = getObject(subject, "http://www.w3.org/2000/01/rdf-schema#label", quads);
  if (label) writer.addQuad(iri, namedNode(PREFIXES.rdfs + "label"), literal(label));

  const description = getObject(subject, "http://www.w3.org/2000/01/rdf-schema#comment", quads) ||
                      getObject(subject, PREFIXES.skos + "definition", quads);
  if (description) writer.addQuad(iri, namedNode(PREFIXES.sh + "description"), literal(description));

  const altLabels = getObjects(subject, PREFIXES.skos + "altLabel", quads);
  for (const alt of altLabels) {
    writer.addQuad(iri, namedNode(PREFIXES.sh + "alternativeName"), literal(alt));
  }

  writer.addQuad(iri, namedNode(PREFIXES.sh + "codeIdentifier"), literal(codeIdentifier));

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

  const label = getObject(subject, "http://www.w3.org/2000/01/rdf-schema#label", quads);
  if (label) writer.addQuad(iri, namedNode(PREFIXES.rdfs + "label"), literal(label));

  const description = getObject(subject, "http://www.w3.org/2000/01/rdf-schema#comment", quads) ||
                      getObject(subject, PREFIXES.skos + "definition", quads);
  if (description) writer.addQuad(iri, namedNode(PREFIXES.sh + "description"), literal(description));

  writer.addQuad(iri, namedNode(PREFIXES.dc + "created"), literal(CREATED_DATE, namedNode(PREFIXES.xsd + "date")));
  writer.addQuad(iri, namedNode(PREFIXES.vs + "term_status"), literal(TERM_STATUS));
  writer.addQuad(iri, namedNode(PREFIXES.dc + "source"), namedNode(SOURCE_URL));
  writer.addQuad(iri, namedNode(PREFIXES.prov + "wasDerivedFrom"), namedNode(DERIVED_FROM));

  const altLabels = getObjects(subject, PREFIXES.skos + "altLabel", quads);
  for (const alt of altLabels) {
    writer.addQuad(iri, namedNode(PREFIXES.sh + "alternativeName"), literal(alt));
  }

  const broader = getObjects(subject, PREFIXES.skos + "broader", quads);
  for (const b of broader) {
    writer.addQuad(iri, namedNode(PREFIXES.skos + "broader"), namedNode(b));
  }

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