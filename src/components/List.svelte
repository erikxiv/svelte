<script>
  export let things;
  let dialog;

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

  const openDialog = () => dialog.open = true;
  const autolist = [
    { text: 'erik', value: 'erik'},
    { text: 'kattis', value: 'kattis'},
  ];
</script>

<style>
  mwc-fab {
    position: fixed;
    right: 50px;
    bottom: 50px;
  }
</style>

<mwc-fab icon="favorite" on:click={openDialog}></mwc-fab>
<mwc-list>
  {#each things as thing, i}
    <Link href="/view/{i}">
      <Teaser {thing} />
    </Link>
  {/each}
</mwc-list>

<EditStatementDialog bind:this={dialog} />
