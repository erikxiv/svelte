<script>
  const auth = require("solid-auth-client");
  function login() {
    auth.login("https://solidcommunity.net", {
      clientName: "Evergraph",
      logoUri: "https://evergraph.me/favicon.svg",
      contacts: ["erikxiv@gmail.com"],
    });
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
