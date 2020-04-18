// Trusts that graphs are json-ld, compacted and flattened
import schema from './schemas/schema.json';
import jsonLdContext from './schemas/jsonLdContext.json';

const array = (n) => Array.isArray(n) ? n : typeof(n) === 'undefined' ? [] : [n];
const findById = (id) => schema["@graph"].find(n => n["@id"] === id);

const getAllClasses = (nodes) => {
  if (! nodes) {
    return [];
  }
  if (Array.isArray(nodes)) {
    return nodes.reduce((acc, curr) => {
      return [...acc, ...getAllClasses(curr)];
    }, []);
  }
  const next = array(findById(nodes)["rdfs:subClassOf"]).map(n => n["@id"])
  return [nodes, ...getAllClasses(next)];
}

const getProperties = (nodes) => {
  if (Array.isArray(nodes)) {
    // retur nodes.sort().map(getProperties)
    return nodes.reduce((acc, curr) => {
      return [...acc, ...getProperties(curr)];
    }, []);
  }
  return schema["@graph"]
    .filter(n => n["@type"] === "rdf:Property")
    .filter(n => typeof(nodes) === 'undefined' || array(n["schema:domainIncludes"]).map(n => n["@id"]).includes(nodes))
    .sort((a,b) => a["@id"].localeCompare(b["@id"]));
}

const getResources = () => {
  return schema["@graph"]
    .filter(n => !!n["@id"])
    .sort((a,b) => a["@id"].localeCompare(b["@id"]));
}

const getSchemaForClass = (node) => {
  const allClasses = getAllClasses(node);
  const allProperties = getProperties(allClasses);
  return Object.assign({
    "@graph": [...allClasses.map(findById), ...allProperties]
  }, jsonLdContext);
}

export default {
  findById,
  getAllClasses,
  getProperties,
  getResources,
  getSchemaForClass,
}
