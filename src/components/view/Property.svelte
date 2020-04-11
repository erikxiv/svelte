<script>
  export let type, value;
</script>

<style>
  .property .type {
    display: block;
    color: rgba(0, 0, 0, 0.54);
    margin-bottom: -8px;
  }
  .property .value {
    display: block;
    margin-bottom: 8px;
  }
</style>

<div class="property">
  <span class="type mdc-typography--overline">{type}</span>
  <span class="value">{value}</span>
</div>
