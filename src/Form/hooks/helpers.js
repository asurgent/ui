import cloneDeep from 'lodash/cloneDeep';

export const updateValue = (form, change) => {
  if (typeof change === 'object') {
    const { name, value } = change;
    if (form[name]) {
      const copy = { ...form };
      Object.assign(copy[name], { value });

      return copy;
    }
  }

  return false;
};

export const appendTranslationPrefix = (errorsList, prefix) => errorsList.map(({
  message_translation_key: t, ...rest
}) => ({
  ...rest,
  message_translation_key: `${prefix}${t}`,
}));

export const updateField = (form, change) => {
  if (form && typeof change === 'object') {
    const { name, value } = change;
    if (form[name]) {
      const copy = { ...form };
      Object.assign(copy[name], value);

      return copy;
    }
  }

  return false;
};

export const updateValues = (form, list) => {
  const copy = { ...form };
  let changed = false;

  if (Array.isArray(list)) {
    list.forEach(({ name, value }) => {
      if (copy[name]) {
        changed = true;
        Object.assign(copy[name], { value });
      }
    });
  }

  if (!changed) {
    return false;
  }

  return copy;
};

export const updateFields = (form, list) => {
  if (!form) {
    return {};
  }

  const copy = { ...form };
  let changed = false;

  if (Array.isArray(list)) {
    list.forEach(({ name, ...rest }) => {
      if (copy[name]) {
        changed = true;
        Object.assign(copy[name], rest);
      }
    });
  }

  if (!changed) {
    return false;
  }

  return copy;
};

const getFiledValue = (ref) => {
  const { value, getArray } = ref.current;

  if (getArray && typeof getArray === 'function') {
    return getArray();
  } if (ref.current.type === 'number') {
    return parseInt(value, 10);
  }

  return value;
};

export const getValues = (references, originalValues) => {
  let dirty = false;
  const dirtyItems = {};
  const keys = (Object.keys(references) || []);
  const values = keys.reduce((acc, key) => {
    if (references[key] && references[key].current) {
      const value = getFiledValue(references[key]);

      if (value !== originalValues[key]) {
        dirty = true;
        Object.assign(dirtyItems, { [key]: true });
      } else {
        Object.assign(dirtyItems, { [key]: false });
      }

      return {
        [key]: value,
        ...acc,
      };
    }

    return acc;
  }, {});

  return { values, dirty, dirtyItems };
};

export const resetValues = (formData, originalValues) => Object.keys(formData)
  .reduce((acc, key) => {
    if (formData[key]) {
      const { value, ...restInput } = formData[key];
      Object.assign(acc, {
        [key]: {
          value: originalValues[key],
          ...restInput,
        },
      });
    } else {
      Object.assign(acc, {
        [key]: formData[key],
      });
    }
    return acc;
  }, {});

/*
formSpec: spec with renderconditions,
formData: actual inputs
currentValues: { {specKey: currentValue}... }
*/
export const getRenderableFields = (formSpec, formData, currentValues) => {
  /**
   * In case formSpec is array, we can assume that
   * its sent from the API and we should just render all
   */
  if (Array.isArray(formSpec)) {
    return formData;
  }
  const render = Object.keys(formSpec)
    .filter((key) => {
      // check if the field has a renderprop
      if (formSpec[key].render) {
        const shouldShow = formSpec[key].render(currentValues);
        if (!shouldShow) {
          return null;
        }
      }
      return formData[key];
    })
    .reduce((acc, key) => ({ ...acc, [key]: formData[key] }), {});

  return render;
};

export const initalValue = (formSpecification, parameters = null) => {
  if (Array.isArray(formSpecification) && typeof parameters === 'object') {
    const formObject = formSpecification.reduce((acc, field) => ({
      ...acc,
      [field.name]: {
        type: field.type,
        tooltip: field.description,
        value: parameters[field.name],
        options: parameters[field.options],
      },
    }), {});

    return formObject;
  } if (typeof formSpecification === 'object') {
    return cloneDeep(formSpecification);
  }
  return {};
};
