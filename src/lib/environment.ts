/*
 * One environment per app
 * Contains documents
 * Loads/saves documents from other locations
 * Each document is referred to by an IRI (chosen according to conventions)
 */
import type { EventEmitter } from 'events';
import rdf from 'rdf-ext';
import toString from 'stream-to-string';
import formats from '@rdfjs/formats';
import type { Stream } from 'readable-stream';
import type DatasetExt from 'rdf-ext/lib/Dataset';

const byPrefix: Record<string, DatasetExt> = {};

const getDocument = (prefix: string): DatasetExt => {
	return byPrefix[prefix];
};

declare global {
	interface Window {
		example: any;
	}
}

const loadDocument = async (
	prefix: string,
	mediaType: string,
	input: EventEmitter,
	options?: any
): Promise<DatasetExt> => {
	const quadStream: Stream = formats.parsers.import(mediaType, input, options);
	if (quadStream === null) {
		throw new Error('Unexpected null when importing quads');
	}
	byPrefix[prefix] = await rdf.dataset().import(quadStream);
	if (prefix === 'example') global.window['example'] = byPrefix[prefix];
	return byPrefix[prefix];
};

const saveDocument = async (prefix: string): Promise<void> => {
	const doc = byPrefix[prefix];
	const serializer = formats.serializers.get('application/ld+json');
	if (!serializer) {
		throw new Error('No serialized for application/ld+json found');
	}
	const stream = serializer.import(doc.toStream());
	toString(stream).then((txt) => localStorage.setItem(prefix, txt));
};

const newDocument = (prefix: string) => {
	byPrefix[prefix] = rdf.dataset();
	return byPrefix[prefix];
};

export default {
	getDocument,
	loadDocument,
	saveDocument,
	newDocument
};
