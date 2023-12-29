<script>
  import Iterator from "./view/Iterator.svelte";
  import { Link, navigate } from "svelte-routing";

  export let thing;
</script>

<md-top-app-bar>
  <md-icon-button
    icon="arrow_back_ios"
    slot="navigationIcon"
    role="button"
    tabindex="0"
    on:click={() => navigate("/")}
    on:keypress={() => navigate("/")}
  ></md-icon-button>
  <md-icon-button icon="more_horiz" slot="actionItems"></md-icon-button>
  <!-- Content -->
  <Link href={window.location.pathname.replace("view", "edit")}>
    <md-fab icon="edit"></md-fab>
  </Link>
  <div class="mdc-layout-grid mdc-typography">
    <div class="mdc-layout-grid__inner">
      <div class="mdc-layout-grid__cell">
        <Iterator {thing} />
      </div>
    </div>
  </div>
</md-top-app-bar>

<style>
  .mdc-layout-grid {
    padding-top: 0px;
  }
</style>
