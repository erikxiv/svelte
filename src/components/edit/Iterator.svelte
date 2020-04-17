<script>
  import '@material/mwc-icon';
  import Selector from './Selector.svelte';

  export let schema, thing;
  const properties = schema['@graph'].filter(n => n["@type"] == "rdf:Property");
  const add = (property) => () => {
    console.log("clicked", property);
    thing[property["@id"]] = "";
    thing = thing;
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

{#each properties as property}
  {#if thing && typeof(thing[property["@id"]]) !== 'undefined'}
    <Selector thing={thing[property["@id"]]} property={property} />
  {:else}
    <div class="typed" title={property["rdfs:comment"]}>
      <span class="type mdc-typography--overline">{property["rdfs:label"]}</span>
      <span class="button" on:click|once={add(property)}><mwc-icon>add_box</mwc-icon></span>
    </div>
  {/if}
{/each}

