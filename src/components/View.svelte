<script>
  /* TODO
  * Lists
  * Sub-objects (how deep? how to tell sub-objects to render small?)
  * Pretty
  */

  import jsonld from 'jsonld';
  import recipeSchema from '../schemas/Recipe.json';
  import schemaContext from '../schemas/schemaContext.json';
  import schema from '../schema';
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
    return arrayMe(p["schema:rangeIncludes"]).map(o => o["@id"]).includes(t);
  }
  const formatDate = (d) => new Intl.DateTimeFormat('sv-SE').format(d);
  const textMe = (n) => typeof(n) === "string" ? n : n["schema:text"];
  export let thing, property;
</script>

<style>
  .mdc-layout-grid {
    padding-top: 0px;
  }
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
  ul {
    list-style: disc;
    list-style-position: inside;
  }
</style>

{#if property}
  {#if typeof(thing) !== "object"}
    {#if rangeIncludes(property, "schema:Duration")}
      <Duration {thing} {property} />
    {:else}
      <div class="property">
        <span class="type mdc-typography--overline">{property["rdfs:label"]}</span>
        <span class="value">{thing}</span>
      </div>
    {/if}
  {:else if Array.isArray(thing)}
    <div class="property">
      <span class="type mdc-typography--overline">{property["rdfs:label"]}</span>
      <ul class="list value">
        {#each thing as item}
          <li>{textMe(item)}</li>
        {/each}
      </ul>
    </div>
  {:else}
    {#if thing["@type"] === "schema:Date"}
      <div class="property">
        <span class="type mdc-typography--overline">{property["rdfs:label"]}</span>
        <span class="value">{formatDate(new Date(thing["@value"]))}</span>
      </div>
    {:else if !thing["@type"] && property["@id"] === "schema:image"}
      <div class="property">
        <span class="type mdc-typography--overline">{property["rdfs:label"]}</span>
        <img src={thing["@id"]} alt={property["rdfs:label"]} />
      </div>
    {:else if thing["@type"] === "schema:ImageObject"}
      <div class="property">
        <span class="type mdc-typography--overline">{property["rdfs:label"]}</span>
        <img src={thing["schema:url"]["@id"]} alt={property["rdfs:label"]} />
      </div>
    {:else if !thing["@type"] && rangeIncludes(property, "schema:URL")}
      <div class="property">
        <span class="type mdc-typography--overline">{property["rdfs:label"]}</span>
        <span class="value">{thing["@id"]}</span>
      </div>
    {:else}
      <div class="property mdc-card mdc-elevation--z4">
        <span class="type mdc-typography--overline">{property["rdfs:label"]}</span>
        <span class="value">
          {#each schema.getSchemaForClass(thing["@type"])['@graph'].filter(n => n["@type"] == "rdf:Property") as property}
            {#if thing[property["@id"]]}
              <svelte:self thing={thing[property["@id"]]} property={property} />
            {/if}
          {/each}
        </span>
      </div>
    {/if}
  {/if}
{:else}
  <div class="mdc-layout-grid mdc-typography">
    <div class="mdc-layout-grid__inner">
      <div class="mdc-layout-grid__cell">
        {#each schema.getSchemaForClass(thing["@type"])['@graph'].filter(n => n["@type"] == "rdf:Property") as property}
          {#if thing[property["@id"]]}
            <svelte:self thing={thing[property["@id"]]} property={property} />
          {/if}
        {/each}
      </div>
    </div>
  </div>
{/if}
