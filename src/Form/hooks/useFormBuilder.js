import { useState, useEffect } from 'react';
import { generateReferences, generateFieldComponents } from '../helpers';

const updateValue = (form, change) => {
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

const updateField = (form, change) => {
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


const updateValues = (form, list) => {
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

const updateFields = (form, list) => {
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

const getValues = (references, originalValues) => {
  let dirty = false;
  const keys = (Object.keys(references) || []);
  const values = keys.reduce((acc, key) => {
    if (references[key] && references[key].current) {
      const { value } = references[key].current;

      if (value !== originalValues[key]) {
        dirty = true;
      }

      return {
        [key]: value,
        ...acc,
      };
    }

    return acc;
  }, {});


  return { values, dirty };
};

const useFormBuilder = (formSpecification, parameters = null) => {
  const [formData, setFormData] = useState(null);
  const [inputFileds, setInputFields] = useState([]);
  const [references, setReferences] = useState({});
  const [originalValues, setOriginalValues] = useState({});

  useEffect(() => {
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

      setFormData(formObject);
    } else if (typeof formSpecification === 'object') {
      setFormData(formSpecification);
    } else {
      setFormData({});
    }
  }, []);

  useEffect(() => {
    if (formData) {
      const referenceList = generateReferences(formData);
      const { fields, original } = generateFieldComponents(formData, referenceList);

      setReferences(referenceList);
      setOriginalValues(original);
      setInputFields(fields);
    }
  }, [formData]);


  return {
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
    getValues: () => getValues(references, originalValues),
    inputFileds,
  };
};

export default useFormBuilder;
