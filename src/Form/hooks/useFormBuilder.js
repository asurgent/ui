import { useState, useEffect } from 'react';
import {
  updateValue,
  appendTranslationPrefix,
  updateField,
  updateValues,
  updateFields,
  getValues,
  resetValues,
  getRenderableFields,
  initalValue,
  generateReferences,
  generateFieldComponents,
} from './helpers';

const getKeyValue = (update, cache) => {
  if (update.value !== undefined) {
    return update.value;
  } if (cache?.value) {
    return cache.value;
  }

  return undefined;
};
const getValuesFromUpdate = (update, cache) => Object.keys(update)
  .reduce((acc, key) => ({
    [key]: getKeyValue(update[key], cache[key]),
    ...acc,
  }), {});

const useFormBuilder = (formSpecification, parameters = null) => {
  // ValueState helps ut keep track of changes i the form both
  // from user-changes and hook-changes. Used in eg. Number.js
  const [valueState, setValueState] = useState({});
  const [formData, setFormData] = useState(initalValue(formSpecification, parameters));
  const [inputFileds, setInputFields] = useState({});
  const [renderedFields, setRenderedFields] = useState([]);
  const [references, setReferences] = useState({});
  const [originalValues, setOriginalValues] = useState({});
  const [resetCallback, setResetCallback] = useState(null);
  const [errors, setErrors] = useState([]);
  // Seperate effect to render error-values on inputfields
  // and that keeps the input-fileds current value
  useEffect(() => {
    if (Object.keys(references).length > 0) {
      const { fields } = generateFieldComponents(formData, references, errors, true);
      setInputFields(fields);

      const { values } = getValues(references, originalValues);
      const render = getRenderableFields(formSpecification, fields, values);

      setRenderedFields(render);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  useEffect(() => {
    if (formData && Object.keys(formData).length > 0) {
      const referenceList = generateReferences(formData);
      const { fields, original } = generateFieldComponents(formData, referenceList, errors);
      setReferences({ ...referenceList });
      setOriginalValues(original);
      setInputFields(fields);

      // Initial check for fields that should be rendered acc. to formSpec
      const values = Object.keys(formData)
        .reduce((acc, key) => ({
          [key]: formData[key].value, ...acc,
        }), {});

      const render = getRenderableFields(formSpecification, fields, values);
      setRenderedFields(render);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  return {
    setResetCallback,
    resetValues: () => {
      const resetData = resetValues(formData, originalValues);
      if (resetData) {
        setFormData(resetData);
        if (resetCallback && resetCallback.run) {
          // passes the resetValues back to Form.js, which passes it to the <Form onChange ...
          resetCallback.run(resetData);
        }
      }
    },
    renderItems: (values) => {
      const fields = getRenderableFields(formSpecification, inputFileds, values);
      setRenderedFields(fields);
    },
    renderFrontendErrors: () => {
      const { validates } = getValues(references, originalValues);
      const errorList = Object.entries(validates)
        .reduce((acc, [property, value]) => {
          if (!value) {
            return [{
              property, message: references[property]?.current?.validationErrorMessage || 'Error',
            }, ...acc];
          }
          return acc;
        }, []);
      setErrors(errorList);
    },
    updateValue: (name, value) => {
      const update = updateValue(formData, { name, value });
      if (update) {
        setFormData(update);
        setValueState(getValuesFromUpdate(update, valueState));
      }
    },
    updateValues: (list) => {
      const update = updateValues(formData, list);
      if (update) {
        setFormData(update);
        setValueState(getValuesFromUpdate(update, valueState));
      }
    },
    updateField: (name, value) => {
      const update = updateField(formData, { name, value });
      if (update) {
        setFormData(update);
        setValueState(getValuesFromUpdate(update, valueState));
      }
    },
    updateFields: (list) => {
      const update = updateFields(formData, list);
      if (update) {
        setFormData(update);
        setValueState(getValuesFromUpdate(update, valueState));
      }
    },
    focusOnField: (key) => {
      const input = references[key];
      if (input && input.current) {
        input.current.focus();
      }
    },
    clearErrorForField: (filedName) => {
      const errorList = errors.find(({ property }) => property !== filedName);
      setErrors(errorList || []);
    },
    blurField: (key) => {
      const input = references[key];

      if (input && input.current) {
        input.current.blur();
      }
    },
    blurFields: () => {
      Object.keys(references).forEach((key) => {
        const input = references[key];
        if (input?.current?.tagName === 'INPUT') {
          input.current.blur();
        }
      });
    },
    addField: (key, field) => {
      if (Object.prototype.hasOwnProperty.call(formData, key) === false) {
        const copy = { ...formData, [key]: field };
        setFormData(copy);
      }
    },
    errors: (errorsList, translation) => {
      if (Array.isArray(errorsList)) {
        // Posibility to pass object translation object
        // that is returned from lib/i18n/addTranslation.js
        if (translation && translation instanceof Object && translation?.translation?.id) {
          const withPrefix = appendTranslationPrefix(errorsList, translation.translation.id);
          setErrors(withPrefix);
          // Simply pass a string that will be used as prefix
        } else if (typeof translation === 'string') {
          const withPrefix = appendTranslationPrefix(errorsList, translation);
          setErrors(withPrefix);
        } else {
          // Dont prefix
          setErrors(errorsList);
        }
      }
    },
    getValues: () => {
      const result = getValues(references, originalValues);
      setValueState(result.values);
      return result;
    },
    inputFileds: renderedFields,
    valueState,
    formData,
  };
};

export default useFormBuilder;
