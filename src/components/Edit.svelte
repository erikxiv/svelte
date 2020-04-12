<script>
  import schema from '../schema';
  import Iterator from './edit/Iterator.svelte';

  export let thing;
  const allClasses = schema.getAllClasses(thing["@type"]);
  const properties = allClasses.map(n => ({"@graph":schema.getProperties(n)}));
</script>

<style>
  .mdc-layout-grid {
    padding-top: 0px;
  }
</style>

<div class="mdc-layout-grid mdc-typography">
  <div class="mdc-layout-grid__inner">
    <div class="mdc-layout-grid__cell">
      <p><a href={window.location.pathname.replace("edit", "view")}>View</a></p>
      {#each allClasses as type, i}
        <h2>{type}</h2>
        <Iterator {thing} schema={properties[i]} />
      {/each}
    </div>
  </div>
</div>
