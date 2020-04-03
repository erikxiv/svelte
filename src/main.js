import App from './App.svelte';
import {version} from '../package.json';
import data from './data';


const app = new App({
  target: document.body,
  props: {
    version,
    data,
  },
});

export default app;
