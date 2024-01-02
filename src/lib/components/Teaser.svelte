<script lang="ts">
	import environment from '../environment';
	import { RDF, SCHEMA } from '$lib/namespaces';
	import type { Term } from '@rdfjs/types';

	export let thing: Term;

	const doc = environment.getDocument('default');
</script>

<md-list-item>
	<span slot="headline"
		>{doc.getValue(thing, SCHEMA('name')) ||
			doc.getValue(thing, SCHEMA('headline')) ||
			doc.getValue(thing, SCHEMA('description'))}</span
	>
	<span slot="supporting-text">{doc.getValue(thing, RDF.type)}</span>
</md-list-item>
