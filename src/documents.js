const rdf = require("rdf-ext");
const Streamify = require("streamify-string");
const toString = require('stream-to-string')
const formats = require('@rdfjs/formats-common')
import { RDFS, RDF, SCHEMA } from './namespaces';
import { wrap } from './convenient-dataset';

const byPrefix = {}

const getDocumentByPrefix = (prefix) => {
  return byPrefix[prefix];
}

const load = async (prefix, mediaType, input, options) => {
  byPrefix[prefix] = wrap(rdf.dataset()).import(formats.parsers.import(mediaType, input, options));
  byPrefix[prefix] = await byPrefix[prefix];
};

const save = async (prefix) => {
  const doc = byPrefix[prefix];
  const serializer = formats.serializers.get('application/ld+json');
  const stream = serializer.import(doc.toStream());
  toString(stream).then(txt => localStorage.setItem(prefix, txt));
}

export default {
  getDocumentByPrefix,
  load,
  save,
}
