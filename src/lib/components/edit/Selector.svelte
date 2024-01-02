<script lang="ts">
	import Iterator from './Iterator.svelte';
	import Property from './Property.svelte';
	import Image from './Image.svelte';
	import List from './List.svelte';
	import Card from './Card.svelte';
	import environment from '../../environment';
	import { RDF, RDFS, SCHEMA } from '$lib/namespaces';
	import type { Term } from '@rdfjs/types';

	export let property: Term, thing: Term;

	const schema = environment.getDocument('schema');
	const doc = environment.getDocument('default');
	const type = doc.getObject(thing, RDF.type);

	// const arrayMe = n => Array.isArray(n) ? n : typeof(n) === 'undefined' ? [] : [n];
	const rangeIncludes = (p: Term, t: Term) => {
		// return arrayMe(p["schema:rangeIncludes"]).map(o => o["@id"]).includes(t);
		return schema.match(p, SCHEMA.rangeIncludes, t).size > 0;
	};
	const formatDate = (d: Date) => new Intl.DateTimeFormat('sv-SE').format(d);
	const textMe = (n: Term) => (n.termType === 'Literal' ? n.value : doc.getValue(n, SCHEMA.text));
</script>

{#if thing.termType === 'Literal'}
	<Property type={schema.getValue(property, RDFS.label)} value={thing.value} />
	<!-- {:else if Array.isArray(thing)}
  <List type={schema.match(property, RDFS.label)[0].object.value}>
    {#each thing as item}
      <li>{textMe(item)}</li>
    {/each}
  </List> -->
{:else if SCHEMA.Date.equals(type)}
	<Property type={Array.from(schema.match(property, RDFS.label))[0].object.value} value={thing.value} />
	<!--   {:else if !thing["@type"] && property["@id"] === SCHEMA.image}
    <Image src={thing["@id"]} type={schema.match(property, RDFS.label)[0].object.value} alt={schema.match(property, RDFS.label)[0].object.value} />
  {:else if type === SCHEMA.ImageObject}
    <Image src={thing[SCHEMA.url]["@id"]} type={schema.match(property, RDFS.label)[0].object.value} alt={schema.match(property, RDFS.label)[0].object.value} />
  {:else if !thing["@type"] && rangeIncludes(property, SCHEMA.URL)}
    <Property type={schema.match(property, RDFS.label)[0].object.value} value={thing["@id"]} />
  {:else}
    <Card type={schema.match(property, RDFS.label)[0].object.value}>
      <Iterator {thing} schema={schema.getSchemaForClass(thing["@type"])} />
    </Card>
 -->
{/if}
