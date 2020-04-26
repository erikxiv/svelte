import App from './App.svelte';
import {version} from '../package.json';
import documents from './documents.js';
const Streamify = require("streamify-string");

import jsonLdSchema from './schemas/schema.json';
documents.load('schema', 'application/ld+json', Streamify(JSON.stringify(jsonLdSchema)));
documents.load('default', 'application/ld+json', Streamify(localStorage.getItem('default') || "{}"));

const app = new App({
  target: document.body,
  props: {
    version,
  },
});

export default app;
