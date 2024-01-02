<script lang="ts">
  import "@material/web/list/list.js";
  import "@material/web/list/list-item.js";

  import auth from "solid-auth-client";
  function login() {
    auth.login("https://solidcommunity.net");
  }
</script>

<md-list>
  <md-list-item>
    <span><strong>Welcome</strong> to Evergraph</span>
  </md-list-item>
  <md-list-item>
    <button on:click|once={login}> Sign in </button>
  </md-list-item>
</md-list>

<style>
  button {
    background: none !important;
    border: none;
    padding: 0 !important;
    color: #069;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
