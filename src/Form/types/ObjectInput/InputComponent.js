import React from 'react';
import PropTypes from 'prop-types';
import { getInputComponent } from './helpers';
import InputWrapper from '../../components/InputWrapper';

const propTypes = {
  type: PropTypes.string,
  render: PropTypes.func,
};

const defaultProps = {
  type: 'text',
  render: () => true,
};

const InputComponent = (props) => {
  const { render, type } = props;
  if (render()) {
    const Component = getInputComponent(type);
    return (
      <InputWrapper style={{ marginBottom: '2.4rem' }} {...props}>
        <Component {...props} />
      </InputWrapper>
    );
  }
  return null;
};

InputComponent.propTypes = propTypes;
InputComponent.defaultProps = defaultProps;

export default InputComponent;
