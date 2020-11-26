import cloneDeep from 'lodash/cloneDeep';
import React from 'react';
import InputWrapper from '../components/InputWrapper';

import Text from '../types/Text/index';
import Number from '../types/Number/index';
import TextArea from '../types/TextArea/index';
import Select from '../types/Select/index';
import FilterSelect from '../types/FilterSelect/index';
import Label from '../types/Label/index';
import Bool from '../types/Bool/index';
import Switch from '../types/Switch/index';
import Email from '../types/Email/index';
import DatePicker from '../types/DatePicker/index';
import RadioGroup from '../types/RadioGroup/index';
import TextMultiple from '../types/TextMultiple/index';
import * as ObjectInput from '../types/ObjectInput/index';

const getInputComponent = (type) => {
  switch (type) {
    case 'bool':
      return Bool;
    case 'text':
      return Text;
    case 'textmultiple':
      return TextMultiple;
    case 'objectsingle':
      return ObjectInput.Single;
    case 'objectmultiple':
      return ObjectInput.Multiple;
    case 'number':
      return Number;
    case 'textarea':
      return TextArea;
    case 'select':
      return Select;
    case 'filterselect':
      return FilterSelect;
    case 'label':
      return Label;
    case 'datepicker':
      return DatePicker;
    case 'radiogroup':
      return RadioGroup;
    case 'email':
      return Email;
    case 'switch':
      return Switch;

    default:
      return Text;
  }
};

const getFieldError = (key, errors) => {
  if (Array.isArray(errors)) {
    const error = errors.find(({ property }) => property === key);
    if (error) {
      const { message, message_translation_key: translationKey } = error;

      return {
        message,
        translationKey,
      };
    }
  }

  return false;
};

export const generateReferences = (inputs) => {
  const referenceList = Object.keys(inputs)
    .reduce((acc, key) => {
      // Ignore labels when generating refercens
      if (inputs[key].type === 'label') {
        return acc;
      }

      return {
        [key]: React.createRef(),
        ...acc,
      };
    }, {});

  return referenceList;
};

export const generateFieldComponents = (inputs, referenceList, errors, keepInputValue, self) => {
  const original = {};
  const fields = Object.keys(inputs)
    .reduce((acc, key) => {
      const {
        type,
        value,
        tooltip,
        tooltipPosition,
        placeholder,
        label,
        options,
        minDate,
        maxDate,
        minValue,
        maxValue,
        noLabel = false,
        parseOutput,
        validator,
        validators,
        className,
        classNameWrapper,
        showContainerError,
        style,
        wrapperStyle,
        description,
        props: inputProps,
        disabled = () => false,
      } = inputs[key];

      let inputValue = value;
      const error = getFieldError(key, errors);

      if (keepInputValue && referenceList[key]?.current) {
        inputValue = referenceList[key].current.value();
      }

      Object.assign(original, { [key]: inputValue });

      const RequestedComponent = getInputComponent(type);
      const Component = (
        <InputWrapper
          description={description}
          style={style}
          wrapperStyle={wrapperStyle}
          label={label || key}
          tooltip={tooltip || ''}
          tooltipPosition={tooltipPosition}
          noLabel={noLabel}
          error={error}
          type={type}
          className={className}
          classNameWrapper={classNameWrapper}
          disabled={disabled}
          showContainerError={showContainerError}
        >
          <RequestedComponent
            hook={self}
            ref={referenceList[key]}
            name={key}
            value={inputValue}
            placeholder={placeholder}
            label={label}
            validator={validator}
            validators={validators}
            minDate={minDate}
            maxDate={maxDate}
            minValue={minValue}
            maxValue={maxValue}
            parseOutput={parseOutput}
            props={inputProps}
            options={options}
            disabled={disabled}
            error={error}
          />
        </InputWrapper>
      );

      return Object.assign(acc, { [key]: Component });
    }, {});

  return { fields, original };
};

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

const getValidator = (ref) => {
  const { validator } = ref.current;
  if (validator && typeof validator === 'function') {
    return validator();
  }
  return true;
};

export const getValues = (references, originalValues) => {
  let dirty = false;
  let valid = true;
  const dirtyItems = {};
  const validates = {};
  const keys = (Object.keys(references) || []);
  const values = keys.reduce((acc, key) => {
    if (references[key] && references[key].current) {
      const value = references[key].current.value();
      const isValid = getValidator(references[key]);

      if (value !== originalValues[key]) {
        dirty = true;
        Object.assign(dirtyItems, { [key]: true });
      } else {
        Object.assign(dirtyItems, { [key]: false });
      }

      if (isValid) {
        Object.assign(validates, { [key]: true });
      } else {
        valid = false;
        Object.assign(validates, { [key]: false });
      }

      return {
        [key]: value,
        ...acc,
      };
    }

    return acc;
  }, {});

  return {
    values,
    valid,
    dirty,
    dirtyItems,
    validates,
  };
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
        label: field.label || field.name,
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
