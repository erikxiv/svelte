<script lang="ts">
	// import pkg from "../../../package.json";
	import { getContext, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import '@material/mwc-drawer';
	import type { Drawer } from '@material/mwc-drawer';
	import '@material/mwc-top-app-bar';
	import '@material/web/fab/fab.js';
	import '@material/web/divider/divider.js';
	import '@material/web/icon/icon.js';
	import '@material/web/iconbutton/icon-button.js';
	import '@material/web/list/list.js';
	import '@material/web/list/list-item.js';
	import 'paper-autocomplete/paper-autocomplete.js';
	import Teaser from './Teaser.svelte';
	import environment from '$lib/environment';
	import { RDF } from '$lib/namespaces';
	import EditStatementDialog from './EditStatementDialog.svelte';
	import type { Term } from '@rdfjs/types';
	import auth from 'solid-auth-client';
	import type DatasetExt from 'rdf-ext/lib/Dataset';

	// let things = getContext<Writable<Term[]>>('things') || [];
	let docs = getContext<Writable<Record<string, DatasetExt>>>('docs') || [];
	$: things = $docs.default
		? Array.from(
				$docs.default.match(null, RDF.type).filter((q) => q.subject.termType === 'NamedNode')
		  ).map((q) => q.subject)
		: [];
	let version = 'undefined'; //pkg.version;
	let drawer: Drawer;
	const dialogIsOpen = writable<boolean>(false);
	setContext('dialogIsOpen', dialogIsOpen);
	const openDialog = () => dialogIsOpen.update(() => true);
	const openDrawer = () => (drawer.open = true);
	const closeDrawer = () => (drawer.open = false);
	const loadExampleData = () => {
		const doc = environment.getDocument('default');
		doc.deleteMatches();
		doc.addAll(environment.getDocument('example'));
		// Might be unecessary, or might be needed to trigger update
		docs.update((x) => {
			x.default = doc;
			return x;
		});
		environment.saveDocument('default');
	};
</script>

<!-- <EditStatementDialog /> -->
<mwc-drawer id="drawer" type="modal" bind:this={drawer}>
	<md-list on:click={closeDrawer} on:keypress={closeDrawer} role="button" tabindex="0">
		<a href="/">
			<md-list-item>
				<span slot="headline">Evergraph</span>
				<span slot="supporting-text">{version}</span>
				<img src="/favicon.svg" alt="logotype" style="height: 24px" slot="end" />
			</md-list-item>
		</a>
		<md-divider />
		<md-list-item>
			<span slot="headline">FAQ</span>
			<md-icon slot="end">help_outline</md-icon>
		</md-list-item>
		<md-list-item
			interactive
			role="button"
			type="button"
			tabindex="0"
			on:click={loadExampleData}
			on:keypress={loadExampleData}
		>
			<span slot="headline">Load example data</span>
			<md-icon slot="end">system_update</md-icon>
		</md-list-item>
		<md-list-item
			interactive
			role="button"
			type="button"
			tabindex="0"
			on:keypress={() => window.location.reload()}
			on:click={() => window.location.reload()}
		>
			<span slot="headline">Reload</span>
			<md-icon slot="end">cached</md-icon>
		</md-list-item>
		<md-list-item
			interactive
			role="button"
			tabindex="0"
			type="button"
			on:click={() => auth.logout()}
			on:keypress={() => auth.logout()}
		>
			<span slot="headline">Sign out</span>
			<md-icon slot="end">exit_to_app</md-icon>
		</md-list-item>
	</md-list>

	<div slot="appContent">
		<mwc-top-app-bar>
			<md-icon-button
				slot="navigationIcon"
				role="button"
				tabindex="0"
				type="button"
				on:click={openDrawer}
				on:keypress={openDrawer}
			>
				<md-icon>menu</md-icon>
			</md-icon-button>
			<md-textfield slot="title" placeholder="Search" />
			<!-- Content -->
			<md-fab role="button" tabindex="0" on:click={openDialog} on:keypress={openDialog}>
				<md-icon slot="icon">add</md-icon>
			</md-fab>
			<md-list>
				{#each things as thing}
					<a href="/view/{encodeURIComponent(thing.value)}">
						<Teaser {thing} />
					</a>
				{/each}
			</md-list>
		</mwc-top-app-bar>
	</div>
</mwc-drawer>

<style>
</style>
