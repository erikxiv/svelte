<script>
  import '@material/mwc-textfield';

  export let type, value;
</script>

<style>
  mwc-textfield { margin-bottom: 8px; }
</style>

<mwc-textfield label={type} {value} iconTrailing="delete"></mwc-textfield>
