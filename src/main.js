import App from './App.svelte';
import {version} from '../package.json';
import things from './data';

const app = new App({
  target: document.body,
  props: {
    version,
    things,
  },
});

export default app;
