<script>
  // import { getProperties, schema } from '../../schema';
  import Selector from './Selector.svelte';
  import environment from '../../environment';
  import { RDF, RDFS } from '../../namespaces';

  export let thing;

  const schema = environment.getDocument('schema');
  const doc = environment.getDocument('default');
  const type = doc.getObject(thing, RDF.type);
  const types = schema.follow(type, RDFS.subClassOf);
  const schemaProperties = schema.getProperties(types);
  const thingProperties = doc.match(thing).toArray().map(q => q.predicate);
</script>

{#each schemaProperties as property}
  {#if thing && thingProperties.some(p => p.equals(property))}
    <Selector thing={doc.match(thing, property).toArray()[0].object} property={property} />
  {/if}
{/each}

