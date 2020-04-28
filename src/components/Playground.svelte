<script>
  import '@material/mwc-list/mwc-list.js';
  import Teaser from './Teaser.svelte';
  import schemaJson from '../schemas/schema.json';
  import dataset from '@graphy/memory.dataset.fast';
  import cf from 'clownface';
  import namespace from '@rdfjs/namespace';
  import Serializer from '@rdfjs/serializer-jsonld-ext';
  const { Readable } = require('stream');
  const DC = namespace("http://purl.org/dc/elements/1.1/");
  const DCTERMS = namespace("http://purl.org/dc/terms/");
  const FOAF = namespace("http://xmlns.com/foaf/0.1/");
  const RDF = namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
  const RDFS = namespace("http://www.w3.org/2000/01/rdf-schema#");
  const SCHEMA = namespace("http://schema.org/");
  const XSD = namespace("http://www.w3.org/2001/XMLSchema#");

  const rdf = require('rdf-ext');
  const rdfds = rdf.dataset();
  rdfds.add(rdf.quad(DC.a, DC.b, DC.c));
  console.log(Readable.from);
  // const r = new Readable();
  // console.log(rdfds.import(r));
  // r.push(schemaJson.toString());
  // r.push();

  const ds = dataset();
  const graph = cf({dataset:ds});

  const allClasses = (nodes) => {
    if (! nodes) {
      return [];
    }
    if (Array.isArray(nodes)) {
      return nodes.reduce((acc, curr) => {
        return [...acc, ...allClasses(curr)];
      }, []);
    }
    const next = graph.namedNode(nodes).out(RDFS.subClassOf).terms;
    return [nodes, ...allClasses(next)];
  }
  const properties = (nodes) => {
    if (! nodes) {
      return [];
    }
    if (Array.isArray(nodes)) {
      return nodes.reduce((acc, curr) => {
        return [...acc, ...properties(curr)];
      }, []);
    }
    return graph.namedNode(nodes).in(schema.domainIncludes).has(RDF.type, RDF.Property).terms;
  }
  const objectme = (nodes) => {
    if (Array.isArray(nodes)) {
      return nodes.map(objectme);
    }
    return graph.namedNode(nodes).out([RDFS.label, RDFS.comment]).values;
  }

</script>

<div>Nothing here</div>
