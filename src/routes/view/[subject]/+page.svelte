<script>
	import View from '$lib/components/View.svelte';
	import { page } from '$app/stores';
	import rdf from 'rdf-ext';
	const { subject } = $page.params;
	const thing = rdf.namedNode(subject);
</script>

<View {thing} />
