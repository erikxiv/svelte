<script>
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
      <a href={window.location.pathname.replace("view", "edit")}>Edit</a>
      <Iterator {thing} />
    </div>
  </div>
</div>
