<script>
  import { navigate } from "svelte-routing";
</script>

<md-top-app-bar>
  <md-icon-button
    icon="arrow_back_ios"
    slot="navigationIcon"
    role="button"
    tabindex="0"
    on:click={() => navigate("/")}
    on:keypress={() => navigate("/")}
  ></md-icon-button>
  <!-- Content -->
  <md-list>
    <md-list-item graphic="icon">
      <span><strong>Search</strong> | is not implemented yet</span>
      <span slot="graphic"><md-icon>visibility_off</md-icon></span>
    </md-list-item>
  </md-list>
</md-top-app-bar>
