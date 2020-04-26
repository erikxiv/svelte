const rdf = require("rdf-ext");
const Streamify = require("streamify-string");
const ParserJsonld = require("@rdfjs/parser-jsonld");
const parserJsonld = new ParserJsonld();
import { RDFS, RDF, SCHEMA } from './namespaces';

const parsers = new rdf.Parsers({
// JSON-LD - application/ld+json - .jsonld
// RDF/XML - application/rdf+xml - .rdf
// Triples - text/plain - .nt
// Turtle - application/x-turtle - .ttl
// CSV - text/csv - .csv
  'application/ld+json': parserJsonld,
});

// import jsonLdSchema from './schemas/schema.json';
// const schema = rdf.dataset().import(parserJsonld.import(Streamify(JSON.stringify(jsonLdSchema))));
// load('application/ld+json', jsonLdSchema);
// console.log('hello');

const byPrefix = {}

// Returns an array of terms
const getAllClasses = (dataset, terms) => {
  if (! terms) {
    return [];
  }
  if (Array.isArray(terms)) {
    return terms.reduce((acc, curr) => {
      return [...acc, ...getAllClasses(curr)];
    }, []);
  }
  const next = dataset.match(terms, RDFS.subClassOf).toArray().map(q => q.object);
  return [terms, ...getAllClasses(dataset, next)];
}

// Returns an array of terms
const getProperties = (dataset, terms) => {
  if (Array.isArray(terms)) {
    return terms.reduce((acc, curr) => {
      return [...acc, ...getProperties(curr)];
    }, []);
  }
  return dataset.match(null, SCHEMA.domainIncludes, terms).toArray().map(q => q.subject);
}

// Returns an array of terms
const getResources = (dataset) => {
  return dataset.toArray().reduce((acc, curr) => {
    if (curr.subject.termType === "NamedNode" && !acc.includes(curr.subject)) {
      acc.push(curr.subject);
    }
    return acc;
  }, []);
}

const getDocumentByPrefix = (prefix) => {
  return byPrefix[prefix];
}

const load = async (prefix, mediaType, input, options) => {
  byPrefix[prefix] = rdf.dataset().import(parsers.import(mediaType, input, options));
  byPrefix[prefix] = await byPrefix[prefix];
  // console.log(`Loaded ${prefix}`, byPrefix[prefix]);
};

export default {
  getAllClasses,
  getProperties,
  getResources,

  getDocumentByPrefix,
  load,
}
