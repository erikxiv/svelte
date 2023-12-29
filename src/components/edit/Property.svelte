<script>
  export let type, value;
</script>

<md-textfield label={type} {value} iconTrailing="delete"></md-textfield>

<style>
  md-textfield {
    margin-bottom: 8px;
  }
</style>
