<script lang="ts">
	import { goto } from '$app/navigation';
	import '@material/mwc-top-app-bar';
	import Iterator from './edit/Iterator.svelte';
	import type { Term } from '@rdfjs/types';

	export let thing: Term;
</script>

<mwc-top-app-bar>
	<md-icon-button
		slot="navigationIcon"
		class="save"
		role="button"
		tabindex="0"
		on:keypress={() => goto(window.location.pathname.replace('edit', 'view'))}
		on:click={() => goto(window.location.pathname.replace('edit', 'view'))}
	>
		<md-icon>check</md-icon>
	</md-icon-button>
	<md-icon-button slot="actionItems">
		<md-icon>more_horiz</md-icon>
	</md-icon-button>
	<!-- Content -->
	<div class="mdc-layout-grid mdc-typography">
		<div class="mdc-layout-grid__inner">
			<div class="mdc-layout-grid__cell">
				<p>
					<a href={window.location.pathname.replace('edit', 'view')}>View</a>
				</p>
				<Iterator {thing} />
			</div>
		</div>
	</div>
</mwc-top-app-bar>

<style>
	.mdc-layout-grid {
		padding-top: 0px;
	}
	md-icon-button.save {
		color: green;
	}
</style>
