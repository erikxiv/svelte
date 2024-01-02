<script lang="ts">
  export let type: string | undefined;
  export let value: string;
</script>

<md-textfield label={type} {value} iconTrailing="delete"></md-textfield>

<style>
  md-textfield {
    margin-bottom: 8px;
  }
</style>
