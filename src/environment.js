/*
 * One environment per app
 * Contains documents
 * Loads/saves documents from other locations
 * Each document is referred to by an IRI (chosen according to conventions)
 */

const rdf = require("rdf-ext");
const toString = require("stream-to-string");
import formats from "@rdfjs/formats-common";
import { RDFS, RDF, SCHEMA } from "./namespaces";
import { wrap } from "./convenient-dataset";

const byPrefix = {};

const getDocument = (prefix) => {
  return byPrefix[prefix];
};

const loadDocument = async (prefix, mediaType, input, options) => {
  console.log("📕", prefix);
  byPrefix[prefix] = wrap(rdf.dataset()).import(
    formats.parsers.import(mediaType, input, options)
  );
  byPrefix[prefix] = await byPrefix[prefix];
  console.log("📗", byPrefix[prefix]);
};

const saveDocument = async (prefix) => {
  const doc = byPrefix[prefix];
  const serializer = formats.serializers.get("application/ld+json");
  const stream = serializer.import(doc.toStream());
  toString(stream).then((txt) => localStorage.setItem(prefix, txt));
};

const newDocument = async (prefix) => {
  byPrefix[prefix] = wrap(rdf.dataset());
  byPrefix[prefix] = await byPrefix[prefix];
};

export default {
  getDocument,
  loadDocument,
  saveDocument,
  newDocument,
};
