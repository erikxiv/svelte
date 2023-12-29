<script>
  import "@material/mwc-top-app-bar";
  import Iterator from "./view/Iterator.svelte";
  import { Link, navigate } from "svelte-routing";

  export let thing;
</script>

<mwc-top-app-bar>
  <md-icon-button
    slot="navigationIcon"
    role="button"
    tabindex="0"
    on:click={() => navigate("/")}
    on:keypress={() => navigate("/")}
  >
    <md-icon>arrow_back_ios</md-icon>
  </md-icon-button>
  <md-icon-button slot="actionItems">
    <md-icon>more_horiz</md-icon>
  </md-icon-button>
  <!-- Content -->
  <Link to={window.location.pathname.replace("view", "edit")}>
    <md-fab><md-icon slot="icon">edit</md-icon></md-fab>
  </Link>
  <div class="mdc-layout-grid mdc-typography">
    <div class="mdc-layout-grid__inner">
      <div class="mdc-layout-grid__cell">
        <Iterator {thing} />
      </div>
    </div>
  </div>
</mwc-top-app-bar>

<style>
  .mdc-layout-grid {
    padding-top: 0px;
  }
</style>
