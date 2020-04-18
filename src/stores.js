import { writable } from 'svelte/store';
import jsonLdContext from './schemas/jsonLdContext.json';

export const dialogIsOpen = writable(false);
export const localGraph = writable(
  localStorage.getItem('default') && JSON.parse(localStorage.getItem('default'))
  || Object.assign({"@graph": []}, jsonLdContext)
);

localGraph.subscribe(value => {
  localStorage.setItem('default', JSON.stringify(value));
})
