<script>
  export let things;
  export let version;

  import "@material/mwc-drawer";
  import "@material/mwc-top-app-bar";
  import "@material/web/fab/fab.js";
  import "@material/web/divider/divider.js";
  import "@material/web/icon/icon.js";
  import "@material/web/iconbutton/icon-button.js";
  import "@material/web/list/list.js";
  import "@material/web/list/list-item.js";
  import "paper-autocomplete/paper-autocomplete.js";
  import { Link } from "svelte-routing";
  import Teaser from "./Teaser.svelte";
  import { dialogIsOpen } from "../stores.js";
  import EditStatementDialog from "./EditStatementDialog.svelte";
  const auth = require("solid-auth-client");

  const openDialog = () => dialogIsOpen.update(() => true);
  const openDrawer = () => (drawer.open = true);
  const closeDrawer = () => (drawer.open = false);
  const loadExampleData = () => {
    doc.then((doc) => {
      doc.deleteMatches();
      doc.addAll(environment.getDocument("example"));
      things = doc
        .match(null, RDF.type)
        .filter((q) => q.subject.termType === "NamedNode")
        .toArray()
        .map((q) => q.subject);
      environment.save("default");
    });
  };
</script>

<EditStatementDialog />
<mwc-drawer id="drawer" type="modal">
  <md-list
    on:click={closeDrawer}
    on:keypress={closeDrawer}
    role="button"
    tabindex="0"
  >
    <Link to="/">
      <md-list-item>
        <span slot="headline">Evergraph</span>
        <span slot="supporting-text">{version}</span>
        <img
          src="/favicon.svg"
          alt="logotype"
          style="height: 24px"
          slot="end"
        />
      </md-list-item>
    </Link>
    <md-divider></md-divider>
    <md-list-item>
      <span slot="headline">FAQ</span>
      <md-icon slot="end">help_outline</md-icon>
    </md-list-item>
    <md-list-item
      interactive
      role="button"
      type="button"
      tabindex="0"
      on:click={loadExampleData}
      on:keypress={loadExampleData}
    >
      <span slot="headline">Load example data</span>
      <md-icon slot="end">system_update</md-icon>
    </md-list-item>
    <md-list-item
      interactive
      role="button"
      type="button"
      tabindex="0"
      on:keypress={() => window.location.reload()}
      on:click={() => window.location.reload()}
    >
      <span slot="headline">Reload</span>
      <md-icon slot="end">cached</md-icon>
    </md-list-item>
    <md-list-item
      interactive
      role="button"
      tabindex="0"
      type="button"
      on:click={() => auth.logout()}
      on:keypress={() => auth.logout()}
    >
      <span slot="headline">Sign out</span>
      <md-icon slot="end">exit_to_app</md-icon>
    </md-list-item>
  </md-list>

  <div slot="appContent">
    <mwc-top-app-bar>
      <md-icon-button
        slot="navigationIcon"
        role="button"
        tabindex="0"
        type="button"
        on:click={openDrawer}
        on:keypress={openDrawer}
      >
        <md-icon>menu</md-icon>
      </md-icon-button>
      <md-textfield slot="title" placeholder="Search"></md-textfield>
      <!-- Content -->
      <md-fab
        role="button"
        tabindex="0"
        on:click={openDialog}
        on:keypress={openDialog}
      >
        <md-icon slot="icon">add</md-icon>
      </md-fab>
      <md-list>
        {#each things as thing, i}
          <Link to="/view/{i}">
            <Teaser {thing} />
          </Link>
        {/each}
      </md-list>
    </mwc-top-app-bar>
  </div>
</mwc-drawer>

<style>
</style>
