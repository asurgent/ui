export const clearObjectValues = (obj) => {
  const objectEmptyValues = Object.keys(obj).map((key) => ({ [key]: '' }));
  return Object.assign({}, ...objectEmptyValues);
};

export const canAddNew = (newEntry, options) => {
  const editableInputs = Object.keys(newEntry).map((key) => {
    const isDisabled = options[key]?.disabled && options[key].disabled();
    const isHidden = options[key]?.render && !options[key].render();
    if (!isDisabled && !isHidden) {
      return newEntry[key];
    }
    return null;
  });
  const allInputsFilled = editableInputs.every((ent) => ent !== '');
  return allInputsFilled;
};
