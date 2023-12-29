import App from "./App.svelte";
import pkg from "../package.json";
import environment from "./environment.js";
import { Readable } from "readable-stream";

import jsonLdSchema from "./schemas/schema.json";
import exampleData from "./data/flattened.json";
environment.loadDocument(
  "schema",
  "application/ld+json",
  Readable.from(JSON.stringify(jsonLdSchema))
);
environment.loadDocument(
  "default",
  "application/ld+json",
  Readable.from(localStorage.getItem("default") || "{}")
);
environment.loadDocument(
  "example",
  "application/ld+json",
  Readable.from(JSON.stringify(exampleData))
);

const app = new App({
  target: document.body,
  props: {
    version: pkg.version,
  },
});

export default app;
