<script>
  import Iterator from './edit/Iterator.svelte';
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
      <p><Link href={window.location.pathname.replace("edit", "view")}>View</Link></p>
      <Iterator {thing} />
    </div>
  </div>
</div>
