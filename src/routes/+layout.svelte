<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import { readable, writable } from 'svelte/store';
	import '$lib/convenient-dataset';
	import Header from './Header.svelte';
	import './styles.css';
	import environment from '$lib/environment';
	import { ReadableString } from '$lib/ReadableString';
	// import { Readable } from 'readable-stream';
	import jsonLdSchema from '$lib/schemas/schema.json';
	import exampleData from '$lib/data/flattened.json';
	import { RDF } from '$lib/namespaces';
	import type { Term } from '@rdfjs/types';
	import type DatasetExt from 'rdf-ext/lib/Dataset';
	console.log('layout starting');
	const things = writable<Term[]>([]);
	const docs = writable<Record<string, DatasetExt>>({});
	onMount(async () => {
		const toLoad: Record<string, string | object> = {
			schema: jsonLdSchema,
			example: exampleData,
			default: localStorage.getItem('default') || {}
		};
		Object.entries(toLoad).forEach(async ([key, json]) => {
			const doc = await environment.loadDocument(
				key,
				'application/ld+json',
				new ReadableString(typeof json === 'object' ? JSON.stringify(json) : json)
			);
			docs.update((x) => {
				x[key] = doc;
				return x;
			});
		});
		// environment.loadDocument(
		// 	'example',
		// 	'application/ld+json',
		// 	new ReadableString(JSON.stringify(exampleData))
		// );
		// const doc = await environment.loadDocument(
		// 	'default',
		// 	'application/ld+json',
		// 	new ReadableString(localStorage.getItem('default') || '{}')
		// );
		// const newThings = Array.from(
		// 	doc.match(null, RDF.type).filter((q) => q.subject.termType === 'NamedNode')
		// ).map((q) => q.subject);
		// things.set(newThings);
	});
	// setContext('things', things);
	setContext('docs', docs);
</script>

<div class="app">
	<main>
		<slot />
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		/* padding: 1rem; */
		width: 100%;
		max-width: 64rem;
		min-height: 100vh;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>
