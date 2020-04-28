<script>
  import '@material/mwc-icon';
  import Selector from './Selector.svelte';
  import documents from '../../documents';
  import { RDF, RDFS } from '../../namespaces';

  export let thing;
  // const properties = schema['@graph'].filter(n => n["@type"] == "rdf:Property");
  const schema = documents.getDocumentByPrefix('schema');
  const doc = documents.getDocumentByPrefix('default');
  const type = doc.getObject(thing, RDF.type);
  const types = schema.follow(type, RDFS.subClassOf);
  const schemaProperties = schema.getProperties(types);
  const thingProperties = doc.match(thing).toArray().map(q => q.predicate);
  const add = (property) => () => {
    console.log("clicked", property);
    // thing[property["@id"]] = "";
    // thing = thing;
  };
</script>

<style>
  .typed {
    display: block;
    color: rgba(0, 0, 0, 0.27);
    /*text-decoration-line: line-through;*/
    margin-bottom: 8px;
  }
  .type.mdc-typography--overline {
    line-height: 1rem;
    vertical-align: middle;
    display: inline;
  }
  .typed .button {
    --mdc-icon-size: 12px;
    /*color: green;*/
    color: rgba(0, 128, 0, 0.75);
    vertical-align: center;
    vertical-align: middle;
    display: inline;
    cursor: pointer;
  }
</style>

{#each schemaProperties as property}
  {#if thing && thingProperties.some(p => p.equals(property))}
    <Selector thing={doc.match(thing, property).toArray()[0].object} property={property} />
  {:else}
    <div class="typed" title={schema.match(property, RDFS.comment).toArray()[0].object.value}>
      <span class="type mdc-typography--overline">{schema.match(property, RDFS.label).toArray()[0].object.value}</span>
      <span class="button" on:click|once={add(property)}><mwc-icon>add_box</mwc-icon></span>
    </div>
  {/if}
{/each}

