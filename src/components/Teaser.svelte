<script>
  import '@material/mwc-list/mwc-list.js';
  import '@material/mwc-list/mwc-list-item.js';
  import '@material/mwc-icon';
  import '@material/mwc-icon-button';
  import documents from '../documents';
  import { RDF, RDFS, SCHEMA } from '../namespaces';

  export let thing;

  const doc = documents.getDocumentByPrefix('default');
  const label = doc.match(thing, SCHEMA.name).toArray() || doc.match(thing, SCHEMA.headline).toArray() || doc.match(thing, SCHEMA.description).toArray();
  const type = doc.match(thing, RDF.type).toArray()[0];
</script>

<mwc-list-item twoline=1>
  <span>{label && label[0] && label[0].object.value}</span>
  <span slot="secondary">{type && type.object.value}</span>
</mwc-list-item>
