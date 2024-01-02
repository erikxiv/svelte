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
  .property.mdc-card {
    padding-top: 4px;
    padding-bottom: 16px;
    padding-left: 16px;
    padding-right: 16px;
    margin-top: 12px;
    margin-bottom: 12px;
    margin-left: -16px;
    margin-right: -16px;
  }
</style>

<div class="property mdc-card mdc-elevation--z4">
  <span class="type mdc-typography--overline">{type}</span>
  <span class="value">
    <slot></slot>
  </span>
</div>
