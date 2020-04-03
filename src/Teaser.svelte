<script>
  export let thing;
  import '@material/mwc-list/mwc-list.js';
  import '@material/mwc-list/mwc-list-item.js';
  import '@material/mwc-icon';
  import '@material/mwc-icon-button';
</script>

<mwc-list-item twoline=1>
  <span>{thing["name"] || thing["headline"] || thing["description"]}</span>
  <span slot="secondary">{thing["@type"]}</span>
</mwc-list-item>
