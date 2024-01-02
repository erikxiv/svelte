<script lang="ts">
	// import { getProperties, schema } from '../../schema';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import Selector from './Selector.svelte';
	import environment from '../../environment';
	import { RDF, RDFS } from '$lib/namespaces';
	import type { Term } from '@rdfjs/types';
	import type DatasetExt from 'rdf-ext/lib/Dataset';

	export let thing: Term;

	let docs = getContext<Writable<Record<string, DatasetExt>>>('docs') || [];
	$: doc = $docs.default;
	$: schema = $docs.schema;
	// const schema = environment.getDocument('schema');
	// const doc = environment.getDocument('default');
	$: type = doc && doc.getObject(thing, RDF.type);
	$: types = schema && schema.follow(type, RDFS.subClassOf);
	$: schemaProperties = schema ? schema.getProperties(types) : [];
	$: thingProperties = doc && Array.from(doc.match(thing)).map((q) => q.predicate);
	// $: console.log('hello', doc, schema, type, types, schemaProperties);
</script>

{#each schemaProperties as property}
	{#if thing && thingProperties.some((p) => p.equals(property))}
		<Selector thing={Array.from(doc.match(thing, property))[0].object} {property} />
	{/if}
{/each}
