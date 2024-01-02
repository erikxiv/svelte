<script lang="ts">
	import { goto } from '$app/navigation';
	import '@material/mwc-top-app-bar';
	import '@material/web/icon/icon.js';
	import '@material/web/fab/fab.js';
	import '@material/web/iconbutton/icon-button.js';
	import Iterator from './view/Iterator.svelte';
	import type { Term } from '@rdfjs/types';

	export let thing: Term;
</script>

<mwc-top-app-bar>
	<md-icon-button
		slot="navigationIcon"
		role="button"
		tabindex="0"
		on:click={() => goto('/')}
		on:keypress={() => goto('/')}
	>
		<md-icon>arrow_back_ios</md-icon>
	</md-icon-button>
	<md-icon-button slot="actionItems">
		<md-icon>more_horiz</md-icon>
	</md-icon-button>
	<!-- Content -->
	<a href={window.location.pathname.replace('view', 'edit')}>
		<md-fab><md-icon slot="icon">edit</md-icon></md-fab>
	</a>
	<div class="mdc-layout-grid mdc-typography">
		<div class="mdc-layout-grid__inner">
			<div class="mdc-layout-grid__cell">
				<Iterator {thing} />
			</div>
		</div>
	</div>
</mwc-top-app-bar>

<style>
	.mdc-layout-grid {
		padding-top: 0px;
	}
</style>
