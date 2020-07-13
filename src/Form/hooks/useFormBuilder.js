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


const useFormBuilder = (formSpecification, parameters = null) => {
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
      const { fields, original } = generateFieldComponents(formData, references, errors, true);
      setOriginalValues(original);
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
          resetCallback.run(resetData);
        }
      }
    },
    renderItems: (values) => {
      const fields = getRenderableFields(formSpecification, inputFileds, values);
      setRenderedFields(fields);
    },
    updateValue: (name, value) => {
      const update = updateValue(formData, { name, value });
      if (update) {
        setFormData(update);
      }
    },
    updateField: (name, value) => {
      const update = updateField(formData, { name, value });
      if (update) {
        setFormData(update);
      }
    },
    updateFields: (list) => {
      const update = updateFields(formData, list);
      if (update) {
        setFormData(update);
      }
    },
    focusOnField: (key) => {
      const input = references[key];

      if (input && input.current) {
        input.current.focus();
      }
    },
    blurField: (key) => {
      const input = references[key];

      if (input && input.current) {
        input.current.blur();
      }
    },
    addField: (key, field) => {
      if (Object.prototype.hasOwnProperty.call(formData, key) === false) {
        const copy = { ...formData, [key]: field };
        setFormData(copy);
      }
    },
    updateValues: (list) => {
      const update = updateValues(formData, list);
      if (update) {
        setFormData(update);
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
    getValues: () => getValues(references, originalValues),
    inputFileds: renderedFields,
    formData,
  };
};

export default useFormBuilder;
