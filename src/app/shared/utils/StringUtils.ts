const removeMask = value => value.replace(/\D+/g, '');
const removeMaskFromProp = prop => object => removeMask(object[prop]);
const propNameQuery = filter => propName => {
  if (filter[propName]) {
    return { [propName]: filter[propName].value };
  }
  return { };
};
export {
  removeMask,
  removeMaskFromProp,
  propNameQuery
};
