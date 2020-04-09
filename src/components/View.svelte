<script>
  import '@material/mwc-list/mwc-list.js';
  import '@material/mwc-list/mwc-list-item.js';
  import jsonld from 'jsonld';
  import recipeSchema from '../schemas/Recipe.json';
  import schemaContext from '../schemas/schemaContext.json';

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
  export let thing;
</script>

{#await jsonld.compact(thing, { "@context": { "schema": "http://schema.org/" }}) then compact}
  <mwc-list>
    {#each recipeSchema['@graph'].filter(n => n["@type"] == "rdf:Property") as property}
      {#if compact[property["@id"]]}
        <mwc-list-item twoline=1>
          <span>{property["rdfs:label"]} <strong>{compact[property["@id"]]}</strong></span>
          <span slot="secondary">
            {#each arrayMe(property["schema:rangeIncludes"]).map(p => p["@id"]) as range}
              &gt;{range}
            {/each}
            {property["rdfs:comment"]}
          </span>
        </mwc-list-item>
      {/if}
    {/each}
  </mwc-list>
  <pre>
    {console.log(compact) || ""}
  </pre>
{/await}
