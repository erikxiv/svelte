<script>
  import Iterator from './view/Iterator.svelte';
  import { Link } from 'yrv';

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
      <Link href={window.location.pathname.replace("view", "edit")}>Edit</Link>
      <Iterator {thing} />
    </div>
  </div>
</div>
