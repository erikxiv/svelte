<script>
  import Iterator from './edit/Iterator.svelte';
  import { Link, navigateTo } from 'yrv';

  export let thing;
</script>

<style>
  .mdc-layout-grid {
    padding-top: 0px;
  }
  mwc-icon-button.save {
    color: green;
  }
</style>

<mwc-top-app-bar>
  <mwc-icon-button icon="check" slot="navigationIcon" class="save" on:click={() => navigateTo(window.location.pathname.replace("edit", "view"))}></mwc-icon-button>
  <mwc-icon-button icon="more_horiz" slot="actionItems"></mwc-icon-button>
  <!-- Content -->
  <div class="mdc-layout-grid mdc-typography">
    <div class="mdc-layout-grid__inner">
      <div class="mdc-layout-grid__cell">
        <p><Link href={window.location.pathname.replace("edit", "view")}>View</Link></p>
        <Iterator {thing} />
      </div>
    </div>
  </div>
</mwc-top-app-bar>
