import App from './App.svelte';
import {version} from '../package.json';
import environment from './environment.js';
const Streamify = require("streamify-string");

import jsonLdSchema from './schemas/schema.json';
import exampleData from './data/flattened.json';
environment.loadDocument('schema', 'application/ld+json', Streamify(JSON.stringify(jsonLdSchema)));
environment.loadDocument('default', 'application/ld+json', Streamify(localStorage.getItem('default') || "{}"));
environment.loadDocument('example', 'application/ld+json', Streamify(JSON.stringify(exampleData)));

const app = new App({
  target: document.body,
  props: {
    version,
  },
});

export default app;
