<script>
  import Iterator from './view/Iterator.svelte';
  import { Link, navigateTo } from 'yrv';
  import '@material/mwc-fab';

  export let thing;
</script>

<style>
  .mdc-layout-grid {
    padding-top: 0px;
  }
</style>

<mwc-top-app-bar>
  <mwc-icon-button icon="arrow_back_ios" slot="navigationIcon" on:click={() => navigateTo('/')}></mwc-icon-button>
  <mwc-icon-button icon="more_horiz" slot="actionItems"></mwc-icon-button>
  <!-- Content -->
  <Link href={window.location.pathname.replace("view", "edit")}>
    <mwc-fab icon="edit"></mwc-fab>
  </Link>
  <div class="mdc-layout-grid mdc-typography">
    <div class="mdc-layout-grid__inner">
      <div class="mdc-layout-grid__cell">
        <Iterator {thing} />
      </div>
    </div>
  </div>
</mwc-top-app-bar>
