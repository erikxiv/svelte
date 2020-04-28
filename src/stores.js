import { writable } from 'svelte/store';
import jsonLdContext from './schemas/jsonLdContext.json';

export const dialogIsOpen = writable(false);
