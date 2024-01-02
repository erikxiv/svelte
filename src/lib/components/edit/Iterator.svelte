<script lang="ts">
	import Selector from './Selector.svelte';
	import environment from '../../environment';
	import { RDF, RDFS } from '$lib/namespaces';
	import type { Term } from '@rdfjs/types';

	export let thing: Term;
	// const properties = schema['@graph'].filter(n => n["@type"] == "rdf:Property");
	const schema = environment.getDocument('schema');
	const doc = environment.getDocument('default');
	const type = doc.getObject(thing, RDF.type);
	const types = schema.follow(type, RDFS.subClassOf);
	const schemaProperties = schema.getProperties(types);
	const thingProperties = Array.from(doc
		.match(thing))
		.map((q) => q.predicate);
	const add = (property: Term) => () => {
		console.log('clicked', property);
		// thing[property["@id"]] = "";
		// thing = thing;
	};
</script>

{#each schemaProperties as property}
	{#if thing && thingProperties.some((p) => p.equals(property))}
		<Selector thing={Array.from(doc.match(thing, property))[0].object} {property} />
	{:else}
		<div class="typed" title={Array.from(schema.match(property, RDFS.comment))[0].object.value}>
			<span class="type mdc-typography--overline"
				>{Array.from(schema.match(property, RDFS.label))[0].object.value}</span
			>
			<span
				class="button"
				on:click|once={add(property)}
				on:keypress|once={add(property)}
				role="button"
				tabindex="0"><md-icon>add_box</md-icon></span
			>
		</div>
	{/if}
{/each}

<style>
	.typed {
		display: block;
		color: rgba(0, 0, 0, 0.27);
		/*text-decoration-line: line-through;*/
		margin-bottom: 8px;
	}
	.type.mdc-typography--overline {
		line-height: 1rem;
		vertical-align: middle;
		display: inline;
	}
	.typed .button {
		--mdc-icon-size: 12px;
		/*color: green;*/
		color: rgba(0, 128, 0, 0.75);
		vertical-align: center;
		vertical-align: middle;
		display: inline;
		cursor: pointer;
	}
</style>
