<script>
  import Property from './Property.svelte';
  import { parse } from 'tinyduration';
  import documents from '../../documents';
  import { RDF, RDFS, SCHEMA } from '../../namespaces';

  export let thing;
  export let property;

  const schema = documents.getDocumentByPrefix('schema');
  const doc = documents.getDocumentByPrefix('default');

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
