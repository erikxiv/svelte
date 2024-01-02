<script lang="ts">
	import Property from './Property.svelte';
	import { parse } from 'tinyduration';
	import environment from '../../environment';
	import { RDF, RDFS, SCHEMA } from '$lib/namespaces';
	import type { Term } from '@rdfjs/types';

	export let thing: Term;
	export let property: Term;

	const schema = environment.getDocument('schema');
	const doc = environment.getDocument('default');

	const humanReadableDuration = (iso8601: string) => {
		const { years, months, weeks, days, hours, minutes, seconds } = parse(iso8601);
		return (
			(years ? `${years}y ` : '') +
			(months ? `${months}mo ` : '') +
			(weeks ? `${weeks}w ` : '') +
			(days ? `${days}d ` : '') +
			(hours ? `${hours}h ` : '') +
			(minutes ? `${minutes}min ` : '') +
			(seconds ? `${seconds}s ` : '')
		);
	};
</script>

<Property type={schema.getValue(property, RDFS.label)} value={humanReadableDuration(thing.value)} />
