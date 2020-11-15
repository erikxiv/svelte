<script>
  export let things;
  export let version;

  import '@material/mwc-button';
  import '@material/mwc-dialog';
  import '@material/mwc-drawer';
  import '@material/mwc-fab';
  import '@material/mwc-formfield';
  import '@material/mwc-icon';
  import '@material/mwc-icon-button';
  import '@material/mwc-list/mwc-list-item.js';
  import '@material/mwc-list/mwc-list.js';
  import '@material/mwc-menu';
  import '@material/mwc-radio';
  import '@material/mwc-textfield';
  import '@material/mwc-top-app-bar';
  import 'paper-autocomplete/paper-autocomplete.js';
  import { Link } from 'yrv';
  import Teaser from './Teaser.svelte';
  import { dialogIsOpen } from '../stores.js';
  const auth = require('solid-auth-client')

  const openDialog = () => dialogIsOpen.update(() => true);
  const openDrawer = () => drawer.open = true;
  const closeDrawer = () => drawer.open = false;
  const loadExampleData = () => {
    doc.then(doc => {
      doc.deleteMatches();
      doc.addAll(environment.getDocument('example'));
      things = doc.match(null, RDF.type).filter(q => q.subject.termType === 'NamedNode').toArray().map(q => q.subject);
      environment.save('default');
    });
  }
</script>

<style>
</style>

<mwc-drawer id="drawer" type="modal">
  <mwc-list on:click={closeDrawer}>
    <Link href="/">
    <mwc-list-item graphic="avatar" twoline=1>
      <span>Evergraph</span>
      <span slot="secondary">{version}</span>
      <img src="/favicon.svg" alt="logotype" slot="graphic" />
    </mwc-list-item>
    </Link>
    <li divider role="separator"></li>
    <mwc-list-item graphic="icon">
      <slot>FAQ</slot>
      <mwc-icon slot="graphic">help_outline</mwc-icon>
    </mwc-list-item>
    <mwc-list-item graphic="icon" on:click={loadExampleData}>
      <slot>Load example data</slot>
      <mwc-icon slot="graphic">system_update</mwc-icon>
    </mwc-list-item>
    <mwc-list-item graphic="icon" on:click={() => window.location.reload()}>
      <slot>Reload</slot>
      <mwc-icon slot="graphic">cached</mwc-icon>
    </mwc-list-item>
    <mwc-list-item graphic="icon" on:click={() => auth.logout()}>
      <slot>Sign out</slot>
      <mwc-icon slot="graphic">exit_to_app</mwc-icon>
    </mwc-list-item>
  </mwc-list>

  <div slot="appContent">
    <mwc-top-app-bar>
      <mwc-icon-button icon="menu" slot="navigationIcon" on:click={openDrawer}></mwc-icon-button>
      <mwc-textfield slot="title" placeholder="Search"></mwc-textfield>
      <!-- Content -->
      <mwc-fab icon="add" on:click={openDialog}></mwc-fab>
      <mwc-list>
        {#each things as thing, i}
          <Link href="/view/{i}">
            <Teaser {thing} />
          </Link>
        {/each}
      </mwc-list>
    </mwc-top-app-bar>
  </div>
</mwc-drawer>
