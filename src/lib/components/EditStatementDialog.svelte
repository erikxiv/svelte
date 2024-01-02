<script lang="ts">
	let dialog: MdDialog, subject: PaperAutocomplete, predicate: PaperAutocomplete, object: PaperAutocomplete;

	import '@material/web/dialog/dialog.js';
  import type { MdDialog } from '@material/web/dialog/dialog.js';
	import '@material/web/button/text-button.js';
	import 'paper-autocomplete/paper-autocomplete.js';
	import type {PaperAutocomplete} from 'paper-autocomplete/paper-autocomplete.js';
	import '@polymer/iron-form/iron-form.js';
	import rdfext from 'rdf-ext';
	import { getContext, onMount } from 'svelte';
  	import type { Writable } from 'svelte/store';
	import Teaser from './Teaser.svelte';
	import environment from '../environment';
	import { RDF, RDFS, SCHEMA } from '$lib/namespaces';
	import type { Term } from '@rdfjs/types';

  const dialogIsOpen = getContext<Writable<boolean>>('dialogIsOpen');
	const schema = environment.getDocument('schema');
	const doc = environment.getDocument('default');

	const allPredicates = schema.getProperties().map((p) => ({
		text: p.value.replace(SCHEMA().value, 'schema:'),
		value: p.value
	}));
	const allResources = Array.from(schema
		.filter((q) => q.subject.termType === 'NamedNode'))
		.map((q) => q.subject.value)
		.filter((value, index, self) => self.indexOf(value) === index)
		.map((p) => ({
			text: p.replace(SCHEMA().value, 'schema:'),
			value: p
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

  const saveHandler = (e: MouseEvent) => submit() || e.stopPropagation();
  const closeHandler = () => dialog.close();
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
			/>
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
			/>
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
			/>
		</form></iron-form
	>
	<div slot="actions">
		<md-text-button
			role="button"
			tabindex="0"
			on:click={saveHandler}
			on:keypress={saveHandler}
			value="ok"
		>
			Ok
		</md-text-button>
		<md-text-button
			role="button"
			tabindex="0"
			on:click={closeHandler}
			on:keypress={closeHandler}
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
