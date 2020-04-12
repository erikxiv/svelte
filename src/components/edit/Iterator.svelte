<script>
  import '@material/mwc-icon';
  import Selector from './Selector.svelte';

  export let schema, thing;
  const properties = schema['@graph'].filter(n => n["@type"] == "rdf:Property");
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
  }
  .typed .button {
    --mdc-icon-size: 16px;
    color: green;
  }
</style>

{#each properties as property}
  {#if thing && thing[property["@id"]]}
    <Selector thing={thing[property["@id"]]} property={property} />
  {:else}
    <div class="typed" title={property["rdfs:comment"]}>
      <span class="type mdc-typography--overline">{property["rdfs:label"]}</span>
      <span class="button"><mwc-icon>add_circle_outlined</mwc-icon></span>
    </div>
  {/if}
{/each}

