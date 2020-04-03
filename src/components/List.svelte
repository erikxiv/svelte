<script>
  export let things;

  import '@material/mwc-list/mwc-list.js';
  import { Link } from 'yrv';
  import Teaser from './Teaser.svelte';
</script>

<mwc-list>
  {#each things as thing, i}
    <Link href="/view/{i}">
      <Teaser {thing} />
    </Link>
  {/each}
</mwc-list>
