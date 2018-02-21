const removeMask = value => value.replace(/\D+/g, '');
const removeMaskFromProp = prop => object => object[prop] ? removeMask(object[prop]) : object[prop];
const removeMaskFromPropTable = prop => object =>
object[prop] !== undefined
? { ...object, [prop]: removeMask(object[prop]) }
: object;

const propNameQuery = filter => propName => {
  if (filter[propName]) {
    return { [propName]: filter[propName].value };
  }
  return { };
};

const parseDataBR = data => new Date(data[2], data[1] - 1, data[0]);
const formatQuery = propName => object =>
  object[propName] !== undefined
    ? { ...object, [propName]: parseDataBR(object[propName].split('/')).toString() }
    : object;

export {
  removeMask,
  removeMaskFromProp,
  removeMaskFromPropTable,
  propNameQuery,
  parseDataBR,
  formatQuery
};
