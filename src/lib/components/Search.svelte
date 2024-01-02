<script>
	import { goto } from '$app/navigation';
	import '@material/mwc-top-app-bar';
</script>

<mwc-top-app-bar>
	<md-icon-button
		icon="arrow_back_ios"
		slot="navigationIcon"
		role="button"
		tabindex="0"
		on:click={() => goto('/')}
		on:keypress={() => goto('/')}
	/>
	<!-- Content -->
	<md-list>
		<md-list-item graphic="icon">
			<span><strong>Search</strong> | is not implemented yet</span>
			<span slot="graphic"><md-icon>visibility_off</md-icon></span>
		</md-list-item>
	</md-list>
</mwc-top-app-bar>
