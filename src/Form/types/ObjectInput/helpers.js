export const clearObjectValues = (obj) => {
  const objectEmptyValues = Object.keys(obj).map((key) => ({ [key]: '' }));
  return Object.assign({}, ...objectEmptyValues);
};

export const valuesPassedValidation = ({ validators, value }) => Object.keys(validators)
  .every((key) => value.every((valEntry) => {
    const fieldValue = valEntry[key];
    const fieldValidation = validators[key].valid;
    return fieldValidation(fieldValue);
  }));

export const valuePassedValidation = ({ validators, value }) => Object.keys(validators)
  .every((key) => {
    const { valid } = validators[key];
    const val = value[key];
    return valid(val);
  });
