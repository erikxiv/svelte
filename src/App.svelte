<script>
  import { onMount } from 'svelte';
  import '@material/mwc-list/mwc-list.js';
  import '@material/mwc-list/mwc-list-item.js';
  import '@material/mwc-menu';
  import '@material/mwc-icon';
  import '@material/mwc-icon-button';
  import '@material/mwc-top-app-bar';
  import Teaser from './Teaser.svelte';
  import List from './List.svelte';
  import Missing from './Missing.svelte';
  import View from './View.svelte';
  import router from './router';

  export let version, things;

  let path = 'undefined';

  onMount(async () => {
    path = window.location.pathname;

    // anchor must share a parent with menu that is `position: relative`
    menu.anchor = menuButton;

    menuButton.addEventListener('click', function (e) {
      menu.open = true;
    });
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }
</script>

<style>
mwc-top-app-bar {
  --mdc-theme-primary: white;
  --mdc-theme-on-primary: black;
}

/* CSS Reset */
html {
  box-sizing: border-box;
  font-size: 16px;
}

*, *:before, *:after {
  box-sizing: inherit;
}

body, h1, h2, h3, h4, h5, h6, p, ol, ul {
  margin: 0;
  padding: 0;
  font-weight: normal;
}

ol, ul {
  list-style: none;
}

img {
  max-width: 100%;
  height: auto;
}
</style>

<mwc-top-app-bar>
  <mwc-icon-button id="menuButton" icon="menu" slot="navigationIcon"></mwc-icon-button>
  <!-- Menu -->
  <mwc-menu id="menu">
    <mwc-list-item graphic="avatar" twoline=1 on:click|once={e => window.location.href="/"}>
      <span>All the things</span>
      <span slot="secondary">{version}</span>
      <img src="/favicon.png" alt="logotype" slot="graphic" />
    </mwc-list-item>
    <li divider role="separator"></li>
    <mwc-list-item graphic="icon">
      <slot>FAQ</slot>
      <mwc-icon slot="graphic">help_outline</mwc-icon>
    </mwc-list-item>
    <mwc-list-item graphic="icon">
      <slot>Sign out</slot>
      <mwc-icon slot="graphic">exit_to_app</mwc-icon>
    </mwc-list-item>
  </mwc-menu>
  <!-- Title -->
  <div slot="title">{path}</div>
  <!-- Content -->
  <div>
    {#if router.match(/^\/$/)}
      <List {things} />
    {:else if router.match(/^\/view\/(?<id>[a-z0-9_\-]+)$/)}
      <View thing={things[router.param(/^\/view\/(?<id>[a-z0-9_\-]+)$/, 'id')]} />
    {:else}
      <Missing />
    {/if}
  </div>
</mwc-top-app-bar>
