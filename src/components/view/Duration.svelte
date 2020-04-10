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

<mwc-list-item twoline=1>
  <span>{humanReadableDuration(thing)}</span>
  <span slot="secondary">
    <i>{property["rdfs:label"]}</i> {property["rdfs:comment"]}
  </span>
</mwc-list-item>
