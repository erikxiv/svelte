<script>
  let dialog, subject, predicate, object;

  import "@material/web/dialog/dialog.js";
  import "@material/web/button/text-button.js";
  import "paper-autocomplete/paper-autocomplete.js";
  import "@polymer/iron-form/iron-form.js";
  import rdfext from "rdf-ext";
  import { onMount } from "svelte";
  import Teaser from "./Teaser.svelte";
  import { dialogIsOpen } from "../stores.js";
  import environment from "../environment";
  import { RDF, RDFS, SCHEMA } from "../namespaces";

  const schema = environment.getDocument("schema");
  const doc = environment.getDocument("default");

  const allPredicates = schema.getProperties().map((p) => ({
    text: p.value.replace(SCHEMA().value, "schema:"),
    value: p.value,
  }));
  const allResources = schema
    .filter((q) => q.subject.termType === "NamedNode")
    .toArray()
    .map((q) => q.subject.value)
    .filter((value, index, self) => self.indexOf(value) === index)
    .map((p) => ({
      text: p.replace(SCHEMA().value, "schema:"),
      value: p,
    }));

  const submit = () => {
    // Some validation of input first
    if (!subject.validate() || !predicate.validate() || !object.validate()) {
      return false;
    }

    // TODO: Add statement
    console.log(subject.text, predicate.text, object.text);
    dialog.close();
    return true;
  };

  onMount(async () => {
    dialogIsOpen.subscribe((value) => {
      if (dialog) {
        dialog.open = value;
      }
    });

    // dialogIsOpen.update(() => true);
  });
</script>

<md-dialog
  bind:this={dialog}
  heading="Add statement"
  on:closed={() => dialogIsOpen.update(() => false)}
>
  <iron-form slot="content" method="dialog"
    ><form id="form-id">
      <paper-autocomplete
        aria-controls="dunnoyet"
        aria-expanded="false"
        role="combobox"
        tabindex="0"
        bind:this={subject}
        label="subject"
        required="true"
        on:keydown|stopPropagation={() => false}
        text="[]"
      ></paper-autocomplete>
      <paper-autocomplete
        aria-controls="dunnoyet"
        aria-expanded="false"
        role="combobox"
        tabindex="0"
        bind:this={predicate}
        label="predicate"
        source={allPredicates}
        required="true"
        on:keydown|stopPropagation={() => false}
        showResultsOnFocus="true"
      ></paper-autocomplete>
      <paper-autocomplete
        aria-controls="dunnoyet"
        aria-expanded="false"
        role="combobox"
        tabindex="0"
        bind:this={object}
        label="object"
        source={allResources}
        required="true"
        on:keydown|stopPropagation={() => object.validate()}
        showResultsOnFocus="true"
      ></paper-autocomplete>
    </form></iron-form
  >
  <div slot="actions">
    <md-text-button
      role="button"
      tabindex="0"
      on:click={(e) => submit() || e.stopPropagation()}
      on:keypress={(e) => submit() || e.stopPropagation()}
      value="ok"
    >
      Ok
    </md-text-button>
    <md-text-button
      role="button"
      tabindex="0"
      on:click={() => dialog.close()}
      on:keypress={() => dialog.close()}
      value="cancel">Cancel</md-text-button
    >
  </div>
</md-dialog>

<style>
  md-dialog div {
    flex-direction: column;
  }
  md-dialog div {
    display: flex;
  }
</style>
