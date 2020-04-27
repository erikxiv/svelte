<script>
  // import { getProperties, schema } from '../../schema';
  import Selector from './Selector.svelte';
  import documents from '../../documents';
  import { RDF, RDFS } from '../../namespaces';

  export let thing;

  const schema = documents.getDocumentByPrefix('schema');
  const doc = documents.getDocumentByPrefix('default');
  console.log(doc);
  const schemaProperties = schema.match(null, RDF.type, RDF.Property).toArray().map(q => q.subject);
  const thingProperties = doc.match(thing).toArray().map(q => q.predicate);
</script>

{#each schemaProperties as property}
  {#if thing && thingProperties.includes(property)}
    <Selector thing={doc.match(thing, property).toArray()[0].object} property={property} />
  {/if}
{/each}

