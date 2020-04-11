<script>
  import schema from '../../schema';
  import Duration from './Duration.svelte';
  import Iterator from './Iterator.svelte';
  import Property from './Property.svelte';
  import Image from './Image.svelte';
  import List from './List.svelte';
  import Card from './Card.svelte';

  export let property, thing;

  const arrayMe = n => Array.isArray(n) ? n : typeof(n) === 'undefined' ? [] : [n];
  const rangeIncludes = (p, t) => {
    return arrayMe(p["schema:rangeIncludes"]).map(o => o["@id"]).includes(t);
  }
  const formatDate = (d) => new Intl.DateTimeFormat('sv-SE').format(d);
  const textMe = (n) => typeof(n) === "string" ? n : n["schema:text"];
</script>

{#if typeof(thing) !== "object"}
  {#if rangeIncludes(property, "schema:Duration")}
    <Duration {thing} {property} />
  {:else}
    <Property type={property["rdfs:label"]} value={thing} />
  {/if}
{:else if Array.isArray(thing)}
  <List type={property["rdfs:label"]}>
    {#each thing as item}
      <li>{textMe(item)}</li>
    {/each}
  </List>
{:else}
  {#if thing["@type"] === "schema:Date"}
    <Property type={property["rdfs:label"]} value={formatDate(new Date(thing["@value"]))} />
  {:else if !thing["@type"] && property["@id"] === "schema:image"}
    <Image src={thing["@id"]} type={property["rdfs:label"]} alt={property["rdfs:label"]} />
  {:else if thing["@type"] === "schema:ImageObject"}
    <Image src={thing["schema:url"]["@id"]} type={property["rdfs:label"]} alt={property["rdfs:label"]} />
  {:else if !thing["@type"] && rangeIncludes(property, "schema:URL")}
    <Property type={property["rdfs:label"]} value={thing["@id"]} />
  {:else}
    <Card type={property["rdfs:label"]}>
      <Iterator {thing} schema={schema.getSchemaForClass(thing["@type"])} />
    </Card>
  {/if}
{/if}
