<script>
  import '@material/mwc-list/mwc-list-item.js';
  import { parse } from 'tinyduration';
  export let thing;
  export let property;
  const humanReadableDuration = (iso8601) => {
    const { years, months, weeks, days, hours, minutes, seconds } = parse(iso8601);
    return (years ? `${years}y ` : '') +
      (months ? `${months}mo ` : '') +
      (weeks ? `${weeks}w ` : '') +
      (days ? `${days}d ` : '') +
      (hours ? `${hours}h ` : '') +
      (minutes ? `${minutes}min ` : '') +
      (seconds ? `${seconds}s ` : '');
  };
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
  <span class="type mdc-typography--overline">{property["rdfs:label"]}</span>
  <span class="value">{humanReadableDuration(thing)}</span>
</div>
