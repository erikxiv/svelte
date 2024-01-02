import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
	return [{ subject: encodeURIComponent('https://evergraph.me#example') }];
};
