<script>
  import '@material/mwc-list/mwc-list.js';
  import '@material/mwc-list/mwc-list-item.js';
  import '@material/mwc-icon';
  import '@material/mwc-icon-button';
  import environment from '../environment';
  import { RDF, RDFS, SCHEMA } from '../namespaces';

  export let thing;

  const doc = environment.getDocument('default');
</script>

<mwc-list-item twoline=1>
  <span>{doc.getValue(thing, SCHEMA.name) || doc.getValue(thing, SCHEMA.headline) || doc.getValue(thing, SCHEMA.description)}</span>
  <span slot="secondary">{doc.getValue(thing, RDF.type)}</span>
</mwc-list-item>
