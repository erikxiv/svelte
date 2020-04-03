<script>
  import { onMount } from 'svelte';
  import '@material/mwc-drawer';
  import '@material/mwc-list/mwc-list.js';
  import '@material/mwc-list/mwc-list-item.js';
  import '@material/mwc-menu';
  import '@material/mwc-icon';
  import '@material/mwc-icon-button';
  import '@material/mwc-top-app-bar';
  import { Router, Route, Link, router } from 'yrv';
  import Teaser from './components/Teaser.svelte';
  import List from './components/List.svelte';
  import Missing from './components/Missing.svelte';
  import View from './components/View.svelte';

  export let version, things;

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }
</script>

<style>
mwc-top-app-bar {
  --mdc-theme-primary: white;
  --mdc-theme-on-primary: black;
}
</style>

<mwc-drawer id="drawer" type="modal">
    <mwc-list on:click={() => drawer.open = false}>
      <Link href="/">
        <mwc-list-item graphic="avatar" twoline=1>
          <span>All the things</span>
          <span slot="secondary">{version}</span>
          <img src="/favicon.png" alt="logotype" slot="graphic" />
        </mwc-list-item>
      </Link>
      <li divider role="separator"></li>
      <mwc-list-item graphic="icon">
        <slot>FAQ</slot>
        <mwc-icon slot="graphic">help_outline</mwc-icon>
      </mwc-list-item>
      <mwc-list-item graphic="icon" on:click={() => window.location.reload()}>
        <slot>Sign out</slot>
        <mwc-icon slot="graphic">exit_to_app</mwc-icon>
      </mwc-list-item>
    </mwc-list>

  <div slot="appContent">
    <mwc-top-app-bar>
      <mwc-icon-button icon="menu" slot="navigationIcon" on:click={() => drawer.open = true}></mwc-icon-button>
      <!-- Title -->
      <div slot="title">{$router.path}</div>
      <!-- Content -->
    </mwc-top-app-bar>
      <div>
        <Router>
          <Route exact>
            <List {things} />
          </Route>
          <Route fallback>
            <Missing />
          </Route>
          <Route exact path="/view/:id" let:router>
            <View thing={things[router.params.id]} />
          </Route>
        </Router>
      </div>
  </div>
</mwc-drawer>
