import React from 'react';

import Text from './types/Text';
import TextArea from './types/TextArea';
import Select from './types/Select';
import Label from './types/Label';

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

export const generateFieldComponents = (inputs, referenceList) => {
  const original = {};
  const fields = Object.keys(inputs).reduce((acc, key) => {
    const {
      type,
      value,
      tooltip,
      label,
      options,
      props: inputProps,
    } = inputs[key];

    Object.assign(original, { [key]: value });
    const RequestedComponent = getInputComponent(type);
    const Component = (
      <RequestedComponent
        ref={referenceList[key]}
        name={key}
        value={value || ''}
        tooltip={tooltip || ''}
        label={label}
        props={inputProps}
        options={options}
      />
    );

    return Object.assign(acc, { [key]: Component });
  }, {});

  return { fields, original };
};
