<script>
  import Selector from './Selector.svelte';

  export let schema, thing;
</script>

{#each schema['@graph'].filter(n => n["@type"] == "rdf:Property") as property}
  {#if thing && thing[property["@id"]]}
    <Selector thing={thing[property["@id"]]} property={property} />
  {/if}
{/each}

