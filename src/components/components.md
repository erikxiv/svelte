# Passing linked data to components

* Graph: Pass RDF/JS [dataset](https://rdf.js.org/dataset-spec/#dataset-interface)
* Node: Pass RDF/JS [term](https://rdf.js.org/data-model-spec/#term-interface)
* Node with values: Pass Node (term) + Graph (dataset), e.g. the latter all triples with Node as subject
* Value: Pass RDF/JS [term](https://rdf.js.org/data-model-spec/#term-interface)
* Array of RDF/JS [term](https://rdf.js.org/data-model-spec/#term-interface)?

Sub-components query global documents object for more data as needed

# Global documents object

* List of documents, represented as RDF/JS [datasets](https://rdf.js.org/dataset-spec/#dataset-interface)
* Facilitates loading and saving of documents

# Dataset wrapper

* Facilitates querying of datasets by adding convenience functions to datasets

# Common expressions

## Get value of a property
`doc.match(property, RDFS.comment).toArray()[0].object.value`

## Get all properties of a thing
`doc.match(thing).toArray().map(q => q.predicate);`
