<script>
  import '@material/mwc-list/mwc-list.js';
  import '@material/mwc-list/mwc-list-item.js';
  import '@material/mwc-icon';
  const auth = require('solid-auth-client')
  function login() {
    auth.login('https://solidcommunity.net', {
      clientName: 'Evergraph',
      logoUri: 'https://evergraph.me/favicon.svg',
      contacts: ['erikxiv@gmail.com']
    });
  }
</script>
<style>
  button {
    background: none!important;
    border: none;
    padding: 0!important;
    color: #069;
    text-decoration: underline;
    cursor: pointer;
  }
</style>

<mwc-list>
  <mwc-list-item>
    <span><strong>Welcome</strong> to Evergraph</span>
  </mwc-list-item>
  <mwc-list-item>
    <button on:click|once={login}>
      Sign in
    </button>
  </mwc-list-item>
</mwc-list>
