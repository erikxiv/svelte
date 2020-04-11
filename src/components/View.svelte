<script>
  import schema from '../schema';
  import Iterator from './view/Iterator.svelte';

  export let thing;
</script>

<style>
  .mdc-layout-grid {
    padding-top: 0px;
  }
</style>

<div class="mdc-layout-grid mdc-typography">
  <div class="mdc-layout-grid__inner">
    <div class="mdc-layout-grid__cell">
      <Iterator {thing} schema={schema.getSchemaForClass(thing["@type"])} />
    </div>
  </div>
</div>
