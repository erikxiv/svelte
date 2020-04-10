<script>
  /* TODO
  * Lists
  * Sub-objects (how deep? how to tell sub-objects to render small?)
  * Pretty
  */

  import '@material/mwc-list/mwc-list.js';
  import '@material/mwc-list/mwc-list-item.js';
  import jsonld from 'jsonld';
  import recipeSchema from '../schemas/Recipe.json';
  import schemaContext from '../schemas/schemaContext.json';
  import Duration from './view/Duration.svelte';

  const CONTEXTS = {
    "http://schema.org/": schemaContext,
    "http://schema.org": schemaContext,
  };
  jsonld.documentLoader = function(url, callback) {
    if(url in CONTEXTS) {
      return callback(
        null, {
          contextUrl: null, // this is for a context via a link header
          document: CONTEXTS[url], // this is the actual document that was loaded
          documentUrl: url // this is the actual context URL after redirects
        });
    } else {
      console.log('invalid context: ' + url);
      throw new Error('invalid context: ' + url);
    }
  };

  const arrayMe = (n) => Array.isArray(n) ? n : [n];
  const rangeIncludes = (p, t) => {
    console.log(arrayMe(p["schema:rangeIncludes"]));
    return arrayMe(p["schema:rangeIncludes"]).map(o => o["@id"]).includes(t);
  }
  export let thing, property;
</script>

{#if property}
  {#if typeof(thing) !== "object"}
    {#if rangeIncludes(property, "schema:Duration")}
      <Duration {thing} {property} />
    {:else}
      <mwc-list-item twoline=1>
        <span>{thing}</span>
        <span slot="secondary">
          {property["rdfs:label"]}. {property["rdfs:comment"]}
        </span>
      </mwc-list-item>
    {/if}
  {:else if Array.isArray(thing)}
    <li divider role="separator"></li>
      {#each thing as item}
        <svelte:self thing={item} property={property} />
      {/each}
    <li divider role="separator"></li>
  {:else}
    {#if thing["@type"] === "schema:Date"}
      <mwc-list-item twoline=1>
        <span>{new Date(thing["@value"])}</span>
        <span slot="secondary">
          {property["rdfs:label"]}. {property["rdfs:comment"]}
        </span>
      </mwc-list-item>
    {:else if !thing["@type"] && property["@id"] === "schema:image"}
      <mwc-list-item graphic="large" twoline=1>
        <img slot="graphic" src={thing["@id"]} alt={property["rdfs:label"]} />
        <span>{property["rdfs:label"]}</span>
        <span slot="secondary">
          {property["rdfs:label"]}. {property["rdfs:comment"]}
        </span>
      </mwc-list-item>
    {:else if !thing["@type"] && rangeIncludes(property, "schema:URL")}
      <mwc-list-item twoline=1>
        <span>{thing["@id"]}</span>
        <span slot="secondary">
          {property["rdfs:label"]}. {property["rdfs:comment"]}
        </span>
      </mwc-list-item>
    {:else}
      <mwc-list-item twoline=1>
        <span>{console.log(property, thing) || property["rdfs:label"]} <strong>{thing["@type"]}</strong></span>
        <span slot="secondary">
          {#each arrayMe(property["schema:rangeIncludes"]).map(p => p["@id"]) as range}
            &gt;{range}
          {/each}
          {property["rdfs:comment"]}
        </span>
      </mwc-list-item>
    {/if}
  {/if}
{:else}
{#await jsonld.compact(thing, { "@context": { "schema": "http://schema.org/" }}) then compact}
  <mwc-list>
    {#each recipeSchema['@graph'].filter(n => n["@type"] == "rdf:Property") as property}
      {#if compact[property["@id"]]}
        <svelte:self thing={compact[property["@id"]]} property={property} />
      {/if}
    {/each}
  </mwc-list>
  <pre>
    {console.log(compact) || ""}
  </pre>
{/await}
{/if}
