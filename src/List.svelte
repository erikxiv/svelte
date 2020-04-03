<script>
  export let things;

  import '@material/mwc-list/mwc-list.js';
  import Teaser from './Teaser.svelte';
</script>

<mwc-list>
  {#each things as thing, i}
    <a href="/view/{i}">
      <Teaser {thing} />
    </a>
  {/each}
</mwc-list>
