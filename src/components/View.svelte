<script>
  export let thing;

  import '@material/mwc-list/mwc-list.js';
  import Teaser from './Teaser.svelte';
</script>

<mwc-list>
  <Teaser {thing} />
</mwc-list>
