const removeMask = value => value.replace(/\D+/g, '');
const removeMaskFromProp = prop => object => removeMask(object[prop]);

export {
  removeMask,
  removeMaskFromProp
};
