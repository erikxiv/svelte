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
  import Teaser from './Teaser.svelte';

  const openDialog = () => document.querySelector('mwc-dialog').open = true;
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
  mwc-dialog div {
    flex-direction: column;
  }
  mwc-dialog div, mwc-radio {
    display: flex;
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

<mwc-dialog heading="Add statement">
  <div>
    <paper-autocomplete label="subject" readonly="true" text="New thing"></paper-autocomplete>
    <paper-autocomplete
      on:autocomplete-blur|preventDefault|stopPropagation={() => console.log('autocomplete-blur')}
      on:autocomplete-focus|preventDefault|stopPropagation={() => console.log('autocomplete-focus')}
      on:autocomplete-change|preventDefault|stopPropagation={() => console.log('autocomplete-change')}
      on:autocomplete-reset-blur|preventDefault|stopPropagation={() => console.log('autocomplete-reset-blur')}
      on:autocomplete-selected|preventDefault|stopPropagation={() => console.log('autocomplete-selected')}
      on:keydown|stopPropagation={() => console.log('keydown')}
      label="predicate" source={autolist} showResultsOnFocus="true"></paper-autocomplete>
    <paper-autocomplete label="object" readonly="true" placeholder="Enter predicate first"></paper-autocomplete>
  </div>
  <mwc-button
      dialogAction="Next"
      slot="primaryAction">
    ok
  </mwc-button>
  <mwc-button
      dialogAction="Cancel"
      slot="secondaryAction">
    cancel
  </mwc-button>
</mwc-dialog>
