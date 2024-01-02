<script lang="ts">
	import Teaser from './Teaser.svelte';
	import schemaJson from '$lib/schemas/schema.json';
	// import dataset from '@graphy/memory.dataset.fast';
	import namespace from '@rdfjs/namespace';
	// import Serializer from '@rdfjs/serializer-jsonld-ext';
	import type Quad from 'rdf-ext/lib/Quad';
	import type DatasetExt from 'rdf-ext/lib/Dataset';
	const DC = namespace('http://purl.org/dc/elements/1.1/');
	const DCTERMS = namespace('http://purl.org/dc/terms/');
	const FOAF = namespace('http://xmlns.com/foaf/0.1/');
	const RDF = namespace('http://www.w3.org/1999/02/22-rdf-syntax-ns#');
	const RDFS = namespace('http://www.w3.org/2000/01/rdf-schema#');
	const SCHEMA = namespace('http://schema.org/');
	const XSD = namespace('http://www.w3.org/2001/XMLSchema#');

	import rdf from 'rdf-ext';
	const graph = rdf.clownface();
	graph.dataset.add(rdf.quad(DC.a, DC.b, DC.c));

	// const ds = dataset();
	// const graph = cf<DatasetExt>({ dataset: ds });

	// const allClasses = (nodes) => {
	// 	if (!nodes) {
	// 		return [];
	// 	}
	// 	if (Array.isArray(nodes)) {
	// 		return nodes.reduce((acc, curr) => {
	// 			return [...acc, ...allClasses(curr)];
	// 		}, []);
	// 	}
	// 	const next = graph.namedNode(nodes).out(RDFS.subClassOf).terms;
	// 	return [nodes, ...allClasses(next)];
	// };
	// const properties = (nodes) => {
	// 	if (!nodes) {
	// 		return [];
	// 	}
	// 	if (Array.isArray(nodes)) {
	// 		return nodes.reduce((acc, curr) => {
	// 			return [...acc, ...properties(curr)];
	// 		}, []);
	// 	}
	// 	return graph.namedNode(nodes).in(schema.domainIncludes).has(RDF.type, RDF.Property).terms;
	// };
	// const objectme = (nodes) => {
	// 	if (Array.isArray(nodes)) {
	// 		return nodes.map(objectme);
	// 	}
	// 	return graph.namedNode(nodes).out([RDFS.label, RDFS.comment]).values;
	// };
</script>

<div>Nothing here</div>
