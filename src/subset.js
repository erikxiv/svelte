import { RDFS, RDF, SCHEMA } from './namespaces';

function wrapReturnValue(dataset, fn) {
  return function() {
    return wrap(fn.apply(dataset, arguments));
  }
}

function getValue(subject, predicate) {
  const ds = this.match(subject, predicate).toArray();
  return ds.length && ds[0].object.value || undefined;
}

function getObject(subject, predicate) {
  const ds = this.match(subject, predicate).toArray();
  return ds.length && ds[0].object || undefined;
}

// Returns an array of terms
function getProperties(terms) {
  if (typeof(terms) === "undefined") {
    return this.match(null, RDF.type, RDF.Property).toArray().map(q => q.subject);
  }
  else if (Array.isArray(terms)) {
    return terms.reduce((acc, curr) => {
      return [...acc, ...this.getProperties(curr)];
    }, []);
  }
  return this.match(null, SCHEMA.domainIncludes, terms).toArray().map(q => q.subject);
}

function follow(terms, predicate) {
  if (! terms) {
    return [];
  }
  if (Array.isArray(terms)) {
    return terms.reduce((acc, curr) => {
      return [...acc, ...this.follow(curr, predicate)];
    }, []);
  }
  const next = this.match(terms, predicate).toArray().map(q => q.object);
  return [terms, ...this.follow(next, predicate)];
}

export const wrap = dataset => {
  if (!dataset._convenient) {
    Object.defineProperties(dataset, {
      // Dataset Core
      add: { value: wrapReturnValue(dataset, dataset.add) },
      delete: { value: wrapReturnValue(dataset, dataset.delete) },
      match: { value: wrapReturnValue(dataset, dataset.match) },
      // Dataset
      addAll: { value: wrapReturnValue(dataset, dataset.addAll) },
      deleteMatches: { value: wrapReturnValue(dataset, dataset.deleteMatches || dataset.removeMatches) },
      difference: { value: wrapReturnValue(dataset, dataset.difference) },
      filter: { value: wrapReturnValue(dataset, dataset.filter) },
      intersection: { value: wrapReturnValue(dataset, dataset.intersection) },
      map: { value: wrapReturnValue(dataset, dataset.map) },
      union: { value: wrapReturnValue(dataset, dataset.union) },
      // Additions
      _convenient: { value: true },
      getValue: { value: getValue },
      getObject: { value: getObject },
      getProperties: { value: getProperties },
      follow: { value: follow },
    });
  }
  return dataset;
};
