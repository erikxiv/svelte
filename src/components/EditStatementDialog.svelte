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
  import '@polymer/iron-form/iron-form.js';
  import rdfext from 'rdf-ext';
  import { onMount } from 'svelte';
  import { Link } from 'yrv';
  import Teaser from './Teaser.svelte';
  import { dialogIsOpen } from '../stores.js';
  import environment from '../environment';
  import { RDF, RDFS, SCHEMA } from '../namespaces';

  const schema = environment.getDocument('schema');
  const doc = environment.getDocument('default');

  const allPredicates = schema.getProperties().map(p => ({
    text: p.value.replace(SCHEMA().value, 'schema:'),
    value: p.value,
  }));
  const allResources = schema
    .filter(q => q.subject.termType === 'NamedNode')
    .toArray()
    .map(q => q.subject.value)
    .filter((value, index, self) => self.indexOf(value) === index)
    .map(p => ({
    text: p.replace(SCHEMA().value, 'schema:'),
    value: p,
  }));

  const submit = () => {
    // Some validation of input first
    if (!subject.validate() || !predicate.validate() || !object.validate()) {
      return false;
    }

    // TODO: Add statement
    console.log(subject.text, predicate.text, object.text);
    return true;
  }

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
    <iron-form><form>
    <paper-autocomplete
      bind:this={subject}
      label="subject"
      required="true"
      on:keydown|stopPropagation={() => false}
      text="[]"></paper-autocomplete>
    <paper-autocomplete
      bind:this={predicate}
      label="predicate"
      source={allPredicates}
      required="true"
      on:keydown|stopPropagation={() => false}
      showResultsOnFocus="true"></paper-autocomplete>
    <paper-autocomplete
      bind:this={object}
      label="object"
      source={allResources}
      required="true"
      on:keydown|stopPropagation={() => object.validate()}
      showResultsOnFocus="true"></paper-autocomplete>
  </form></iron-form>
  </div>
  <mwc-button
      dialogAction="Next"
      slot="primaryAction" on:click={(e) => submit() || e.stopPropagation()}>
    ok
  </mwc-button>
  <mwc-button
      dialogAction="Cancel"
      slot="secondaryAction">
    cancel
  </mwc-button>
</mwc-dialog>
