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

  const autolist = schema.getProperties().map(p => ({
    text: p["rdfs:label"],
    value: p["@id"],
  }));

  onMount(async () => {
    dialogIsOpen.subscribe(value => {
      if (dialog) {
        dialog.open = value;
      }
    });

    dialogIsOpen.update(() => true);
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
    <paper-autocomplete bind:this={subject} label="subject" text="New thing"></paper-autocomplete>
    <paper-autocomplete bind:this={predicate}
      on:keydown|stopPropagation={() => false}
      label="predicate" source={autolist} showResultsOnFocus="true">
  <template autocomplete-custom-template=1>
    <paper-item on-tap="_onSelect" id$="[[_getSuggestionId(index)]]" role="option" aria-selected="false">
      <style>
        /** Styles for your custom template here **/
      </style>

      YOUR CUSTOM TEMPLATE
      <paper-ripple></paper-ripple>
    </paper-item>
  </template>
      </paper-autocomplete>
    <paper-autocomplete bind:this={object} label="object"></paper-autocomplete>
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
