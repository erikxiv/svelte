<script>
  import '@material/mwc-list/mwc-list.js';
  import Teaser from './Teaser.svelte';
  import schemaJson from '../schemas/schema.json';
  import schema_ttl from '../schemas/schema.ttl';
  import factory from '@graphy/core.data.factory';
  import dataset from '@graphy/memory.dataset.fast';
  import ttl_read from '@graphy/content.ttl.read';
  import cf from 'clownface';
  import namespace from '@rdfjs/namespace';
  import Serializer from '@rdfjs/serializer-jsonld-ext';

  import s from '../schema';

  const dc = namespace("http://purl.org/dc/elements/1.1/");
  const dcterms = namespace("http://purl.org/dc/terms/");
  const foaf = namespace("http://xmlns.com/foaf/0.1/");
  const rdf = namespace("http://www.w3.org/1999/02/22-rdf-syntax-ns#");
  const rdfs = namespace("http://www.w3.org/2000/01/rdf-schema#");
  const schema = namespace("http://schema.org/");
  const xsd = namespace("http://www.w3.org/2001/XMLSchema#");

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
    const next = graph.namedNode(nodes).out(rdfs.subClassOf).terms;
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
    return graph.namedNode(nodes).in(schema.domainIncludes).has(rdf.type, rdf.Property).terms;
  }
  const objectme = (nodes) => {
    if (Array.isArray(nodes)) {
      return nodes.map(objectme);
    }
    return graph.namedNode(nodes).out([rdfs.label, rdfs.comment]).values;
  }

ttl_read(schema_ttl, {
    // whew! simplified inline events style  ;)
    data(y_quad) {
        ds.add(y_quad);
    },

    eof(h_prefixes) {
        console.log('done!');
        console.log(graph.namedNode(schema.Recipe).out([rdfs.label, rdfs.comment]).values);

const context = {
  '@vocab': 'http://schema.org/',
  ex: 'http://example.org/'
}

    },
});

</script>

<div>Schema items: {schema['@graph'].length}</div>
