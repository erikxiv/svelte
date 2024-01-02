<script lang="ts">
  export let type: string;
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
  ul {
    list-style: disc;
    list-style-position: inside;
  }
</style>

<div class="property">
  <span class="type mdc-typography--overline">{type}</span>
  <ul class="list value">
    <slot></slot>
  </ul>
</div>
