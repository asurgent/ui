export const clearObjectValues = (obj) => {
    const objectEmptyValues = Object.keys(obj).map((key) => ({ [key]: '' }));
    return Object.assign({}, ...objectEmptyValues);
  };
