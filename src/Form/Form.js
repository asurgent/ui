import React from 'react';
import PropTypes from 'prop-types';
import { FormStyle, FormRow } from './Form.styled';
import { withDelayTimer } from './helpers';

const triggerTimer = withDelayTimer((values, name, onNewValue) => {
  onNewValue(values, name);
}, 950);

const propTyps = {
  form: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onFocusChange: PropTypes.func,
  onNewValue: PropTypes.func,
};

const defaultProps = {
  children: null,
  onChange: () => {},
  onSubmit: () => {},
  onFocusChange: () => {},
  onNewValue: () => {},
};

const Form = (props) => {
  const {
    form,
    children,
    onChange,
    onSubmit,
    onFocusChange,
    onNewValue,
  } = props;

  if (!form || typeof form !== 'object' || !form.inputFileds) {
    return null;
  }

  const { inputFileds } = form;

  const handleOnChange = (event) => {
    const { name } = event.target;
    const { values, dirty } = form.getValues();

    triggerTimer(values, dirty, onNewValue);
    onChange(values, dirty, name);
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    const { values, dirty } = form.getValues();

    onFocusChange(values, dirty, name);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { values, dirty } = form.getValues();
    onSubmit(values, dirty);
  };

  const onSubmitAction = () => {
    form.getValues();
    const { values, dirty } = form.getValues();
    onSubmit(values, dirty);
  };

  const renderForms = Object
    .keys(inputFileds)
    .map((key) => (
      <FormRow key={key}>
        {inputFileds[key]}
      </FormRow>
    ));

  return (
    <FormStyle onChange={handleOnChange} onSubmit={handleSubmit} onBlur={handleBlur}>
      { typeof children === 'function' && children(inputFileds, renderForms, onSubmitAction) }
      { typeof children !== 'function' && renderForms}
    </FormStyle>
  );
};

Form.defaultProps = defaultProps;
Form.propTypes = propTyps;
Form.displayName = '@asurgent.ui.Form';

export default Form;
