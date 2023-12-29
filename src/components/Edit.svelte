<script>
  import "@material/mwc-top-app-bar";
  import Iterator from "./edit/Iterator.svelte";
  import { Router, Link, navigate } from "svelte-routing";

  export let thing;
</script>

<mwc-top-app-bar>
  <md-icon-button
    slot="navigationIcon"
    class="save"
    role="button"
    tabindex="0"
    on:keypress={() =>
      navigate(window.location.pathname.replace("edit", "view"))}
    on:click={() => navigate(window.location.pathname.replace("edit", "view"))}
  >
    <md-icon>check</md-icon>
  </md-icon-button>
  <md-icon-button slot="actionItems">
    <md-icon>more_horiz</md-icon>
  </md-icon-button>
  <!-- Content -->
  <div class="mdc-layout-grid mdc-typography">
    <div class="mdc-layout-grid__inner">
      <div class="mdc-layout-grid__cell">
        <p>
          <Link to={window.location.pathname.replace("edit", "view")}>View</Link
          >
        </p>
        <Iterator {thing} />
      </div>
    </div>
  </div>
</mwc-top-app-bar>

<style>
  .mdc-layout-grid {
    padding-top: 0px;
  }
  md-icon-button.save {
    color: green;
  }
</style>
