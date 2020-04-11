<script>
  import Property from './Property.svelte';
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

<Property type={property["rdfs:label"]} value={humanReadableDuration(thing)} />
