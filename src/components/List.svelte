<script>
  export let things;
  export let version;

  import "paper-autocomplete/paper-autocomplete.js";
  import { Link } from "svelte-routing";
  import Teaser from "./Teaser.svelte";
  import { dialogIsOpen } from "../stores.js";
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

<md-drawer id="drawer" type="modal">
  <md-list
    on:click={closeDrawer}
    on:keypress={closeDrawer}
    role="button"
    tabindex="0"
  >
    <Link href="/">
      <md-list-item graphic="avatar" twoline="1">
        <span>Evergraph</span>
        <span slot="secondary">{version}</span>
        <img src="/favicon.svg" alt="logotype" slot="graphic" />
      </md-list-item>
    </Link>
    <li divider role="separator"></li>
    <md-list-item graphic="icon">
      <slot>FAQ</slot>
      <md-icon slot="graphic">help_outline</md-icon>
    </md-list-item>
    <md-list-item
      graphic="icon"
      role="button"
      tabindex="0"
      on:click={loadExampleData}
      on:keypress={loadExampleData}
    >
      <slot>Load example data</slot>
      <md-icon slot="graphic">system_update</md-icon>
    </md-list-item>
    <md-list-item
      graphic="icon"
      role="button"
      tabindex="0"
      on:keypress={() => window.location.reload()}
      on:click={() => window.location.reload()}
    >
      <slot>Reload</slot>
      <md-icon slot="graphic">cached</md-icon>
    </md-list-item>
    <md-list-item
      graphic="icon"
      role="button"
      tabindex="0"
      on:click={() => auth.logout()}
      on:keypress={() => auth.logout()}
    >
      <slot>Sign out</slot>
      <md-icon slot="graphic">exit_to_app</md-icon>
    </md-list-item>
  </md-list>

  <div slot="appContent">
    <md-top-app-bar>
      <md-icon-button
        icon="menu"
        slot="navigationIcon"
        role="button"
        tabindex="0"
        on:click={openDrawer}
        on:keypress={openDrawer}
      ></md-icon-button>
      <md-textfield slot="title" placeholder="Search"></md-textfield>
      <!-- Content -->
      <md-fab
        icon="add"
        role="button"
        tabindex="0"
        on:click={openDialog}
        on:keypress={openDialog}
      ></md-fab>
      <md-list>
        {#each things as thing, i}
          <Link href="/view/{i}">
            <Teaser {thing} />
          </Link>
        {/each}
      </md-list>
    </md-top-app-bar>
  </div>
</md-drawer>

<style>
</style>
