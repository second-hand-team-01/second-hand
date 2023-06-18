export const removeEmptyKeyValues = (object: object) => {
  const copiedObject = { ...object };
  Object.entries(copiedObject).forEach((set) => {
    const [key, value] = set;
    if (value === undefined || value === null) delete copiedObject[key];
  });
  return copiedObject;
};
