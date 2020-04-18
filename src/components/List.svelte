<script>
  export let things;

  import '@material/mwc-fab';
  import '@material/mwc-list/mwc-list.js';
  import '@material/mwc-textfield';
  import '@material/mwc-dialog';
  import '@material/mwc-button';
  import '@material/mwc-radio';
  import '@material/mwc-formfield';
  import 'paper-autocomplete/paper-autocomplete.js';
  import { Link } from 'yrv';
  import EditStatementDialog from './EditStatementDialog.svelte';
  import Teaser from './Teaser.svelte';
  import { dialogIsOpen } from '../stores.js';

  const openDialog = () => dialogIsOpen.update(() => true);
</script>

<style>
  mwc-fab {
    position: fixed;
    right: 50px;
    bottom: 50px;
    --mdc-theme-secondary: white;
    --mdc-theme-on-secondary: black;
  }
</style>

<mwc-fab icon="add" on:click={openDialog}></mwc-fab>
<mwc-list>
  {#each things as thing, i}
    <Link href="/view/{i}">
      <Teaser {thing} />
    </Link>
  {/each}
</mwc-list>

<EditStatementDialog />
