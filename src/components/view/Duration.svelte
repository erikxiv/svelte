<script>
  import Property from './Property.svelte';
  import { parse } from 'tinyduration';
  import environment from '../../environment';
  import { RDF, RDFS, SCHEMA } from '../../namespaces';

  export let thing;
  export let property;

  const schema = environment.getDocument('schema');
  const doc = environment.getDocument('default');

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

<Property type={schema.getValue(property, RDFS.label)} value={humanReadableDuration(thing.value)} />
