import DatasetExt from 'rdf-ext/lib/Dataset';
import rdf from 'rdf-ext';
import { RDF, SCHEMA } from './namespaces';
import type Quad from 'rdf-ext/lib/Quad';
import type { Term } from '@rdfjs/types';

declare module 'rdf-ext/lib/Dataset' {
	interface DatasetExt {
		// Augment dataset with convenience functions
		getValue(subject: Term, predicate: Term): string | undefined;
		getObject(subject: Term, predicate: Term): Term | undefined;
		getProperties(terms?: Term | Term[]): Term[];
		follow(terms: Term | Term[] | undefined, predicate: Term): Term[];
	}
}

DatasetExt.prototype.getValue = function (subject: Term, predicate: Term) {
	const ds = Array.from(this.match(subject, predicate));
	return (ds.length && ds[0].object.value) || undefined;
};

DatasetExt.prototype.getObject = function (subject: Term, predicate: Term) {
	const ds = Array.from(this.match(subject, predicate));
	return (ds.length && ds[0].object) || undefined;
};

// Returns an array of terms
DatasetExt.prototype.getProperties = function (terms?: Term | Term[]) {
	if (typeof terms === 'undefined') {
		return Array.from(this.match(null, RDF.type, RDF.Property)).map((q) => q.subject);
	} else if (Array.isArray(terms)) {
		return terms.reduce((acc: Term[], curr: Term) => {
			return [...acc, ...this.getProperties(curr)];
		}, []);
	}
	return Array.from(this.match(null, SCHEMA.domainIncludes, terms)).map((q) => q.subject);
};

DatasetExt.prototype.follow = function (terms: Term | Term[] | undefined, predicate: Term) {
	if (!terms) {
		return [];
	}
	if (Array.isArray(terms)) {
		return terms.reduce((acc: Term[], curr: Term) => {
			return [...acc, ...this.follow(curr, predicate)];
		}, []);
	}
	const next = Array.from(this.match(terms, predicate)).map((q) => q.object);
	return [terms, ...this.follow(next, predicate)];
};
