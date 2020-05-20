import React from 'react';
import InputWrapper from './components/InputWrapper';

import Text from './types/Text';
import TextArea from './types/TextArea';
import Select from './types/Select';
import Label from './types/Label';
import DatePicker from './types/DatePicker/index';
import RadioGroup from './types/RadioGroup/index';

export const withDelayTimer = (action, timeout = 500) => {
  let timer = setTimeout(() => {}, timeout);
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      action(...args);
    }, timeout);
  };
};

const getInputComponent = (type) => {
  switch (type) {
    case 'text':
      return Text;
    case 'textarea':
      return TextArea;
    case 'select':
      return Select;
    case 'label':
      return Label;
    case 'datepicker':
      return DatePicker;
    case 'radiogroup':
      return RadioGroup;
    default:
      return Text;
  }
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

export const generateFieldComponents = (inputs, referenceList, errors) => {
  const original = {};
  const fields = Object.keys(inputs)
    .reduce((acc, key) => {
      const {
        type,
        value,
        tooltip,
        placeholder,
        label,
        options,
        minDate,
        maxDate,
        noLabel = false,
        props: inputProps,
      } = inputs[key];

      const error = getFieldError(key, errors);

      Object.assign(original, { [key]: value });
      const RequestedComponent = getInputComponent(type);
      const Component = (
        <InputWrapper
          label={label || key}
          tooltip={tooltip || ''}
          noLabel={noLabel}
          error={error}
          type={type}
        >
          <RequestedComponent
            ref={referenceList[key]}
            name={key}
            value={value || ''}
            placeholder={placeholder || ''}
            label={label}
            minDate={minDate}
            maxDate={maxDate}
            props={inputProps}
            options={options}
          />
        </InputWrapper>
      );

      return Object.assign(acc, { [key]: Component });
    }, {});

  return { fields, original };
};
