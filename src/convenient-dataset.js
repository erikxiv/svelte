function wrapReturnValue(dataset, fn) {
  return function() {
    return wrap(fn.apply(dataset, arguments));
  }
}

function getValue(subject, predicate) {
  const ds = this.match(subject, predicate).toArray();
  return ds.length && ds[0].object.value || undefined;
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
    });
  }
  return dataset;
};







