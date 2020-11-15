<script>
  import '@material/mwc-list/mwc-list.js';
  import '@material/mwc-list/mwc-list-item.js';
  import '@material/mwc-icon';
  import { Link, navigateTo } from 'yrv';
</script>

<mwc-top-app-bar>
  <mwc-icon-button icon="arrow_back_ios" slot="navigationIcon" on:click={() => navigateTo('/')}></mwc-icon-button>
  <!-- Content -->
  <mwc-list>
    <mwc-list-item graphic="icon">
      <span><strong>Search</strong> | is not implemented yet</span>
      <span slot="graphic"><mwc-icon>visibility_off</mwc-icon></span>
    </mwc-list-item>
  </mwc-list>
</mwc-top-app-bar>
