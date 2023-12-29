<script>
  import environment from "../environment";
  import { RDF, RDFS, SCHEMA } from "../namespaces";

  export let thing;

  const doc = environment.getDocument("default");
</script>

<md-list-item twoline="1">
  <span
    >{doc.getValue(thing, SCHEMA.name) ||
      doc.getValue(thing, SCHEMA.headline) ||
      doc.getValue(thing, SCHEMA.description)}</span
  >
  <span slot="secondary">{doc.getValue(thing, RDF.type)}</span>
</md-list-item>
