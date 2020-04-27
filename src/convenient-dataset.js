function wrapReturnValue(dataset, fn) {
  return function() {
    return wrap(fn.apply(dataset, arguments));
  }
}

function getValue(dataset, fn) {
  return function(subject, predicate) {
    const ds = dataset.match(subject, predicate).toArray();
    return ds.length && ds[0].object.value || undefined;
  }
}

export const wrap = dataset => {
  Object.defineProperties(dataset, {
    // Dataset Core
    add: { value: wrapReturnValue(dataset, dataset.add) },
    delete: { value: wrapReturnValue(dataset, dataset.delete) },
    match: { value: wrapReturnValue(dataset, dataset.match) },
    // Dataset
    addAll: { value: wrapReturnValue(dataset, dataset.addAll) },
    deleteMatches: { value: wrapReturnValue(dataset, dataset.deleteMatches) },
    difference: { value: wrapReturnValue(dataset, dataset.difference) },
    filter: { value: wrapReturnValue(dataset, dataset.filter) },
    intersection: { value: wrapReturnValue(dataset, dataset.intersection) },
    map: { value: wrapReturnValue(dataset, dataset.map) },
    union: { value: wrapReturnValue(dataset, dataset.union) },
    // Additions
    test: { value: 'yes, still here' },
    getValue: { value: getValue(dataset) },
  });
  return dataset;
};







