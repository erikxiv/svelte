<script>
  import schema from '../schema';
  import Iterator from './edit/Iterator.svelte';

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
      <p><a href={window.location.pathname.replace("edit", "view")}>View</a></p>
      <Iterator {thing} />
    </div>
  </div>
</div>
