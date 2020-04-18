<script>
  let dialog, subject, predicate, object;

  import '@material/mwc-fab';
  import '@material/mwc-list/mwc-list.js';
  import '@material/mwc-textfield';
  import '@material/mwc-dialog';
  import '@material/mwc-button';
  import '@material/mwc-radio';
  import '@material/mwc-formfield';
  import 'paper-autocomplete/paper-autocomplete.js';
  import { onMount } from 'svelte';
  import { Link } from 'yrv';
  import Teaser from './Teaser.svelte';
  import { dialogIsOpen } from '../stores.js';
  import schema from '../schema';

  const allPredicates = schema.getProperties().map(p => ({
    text: p["rdfs:label"],
    value: p["@id"],
  }));
  const allResources = schema.getResources().map(p => ({
    text: p["rdfs:label"],
    value: p["@id"],
  }));

  onMount(async () => {
    dialogIsOpen.subscribe(value => {
      if (dialog) {
        dialog.open = value;
      }
    });

    // dialogIsOpen.update(() => true);
  });
</script>

<style>
  mwc-dialog div {
    flex-direction: column;
  }
  mwc-dialog div {
    display: flex;
  }
</style>

<mwc-dialog bind:this={dialog} heading="Add statement" on:closed={() => dialogIsOpen.update(() => false)}>
  <div>
    <paper-autocomplete bind:this={subject} label="subject" on:keydown|stopPropagation={() => false} text="New thing"></paper-autocomplete>
    <paper-autocomplete bind:this={predicate} label="predicate" on:keydown|stopPropagation={() => false} source={allPredicates} showResultsOnFocus="true"></paper-autocomplete>
    <paper-autocomplete bind:this={object} label="object" on:keydown|stopPropagation={() => false} source={allResources} showResultsOnFocus="true"></paper-autocomplete>
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
