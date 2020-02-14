import React from 'react';
import PropTypes from 'prop-types';
import { FormStyle, FormRow } from './Form.styled';
import { withDelayTimer } from './helpers';

const triggerTimer = withDelayTimer((values, dirty, dirtyItems, onNewValue) => {
  onNewValue(values, dirty, dirtyItems);
}, 950);

const propTyps = {
  form: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  className: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onFocusChange: PropTypes.func,
  onNewValue: PropTypes.func,
};

const defaultProps = {
  children: null,
  className: '',
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
    className,
  } = props;

  if (!form || typeof form !== 'object' || !form.inputFileds) {
    return null;
  }

  const { inputFileds } = form;

  const handleOnChange = (event) => {
    const { name } = event.target;
    const { values, dirty, dirtyItems } = form.getValues();

    triggerTimer(values, dirty, dirtyItems, onNewValue);
    onChange(values, dirty, dirtyItems, name);
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    const { values, dirty, dirtyItems } = form.getValues();

    onFocusChange(values, dirty, dirtyItems, name);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { values, dirty, dirtyItems } = form.getValues();
    onSubmit(values, dirty, dirtyItems);
  };

  const onSubmitAction = () => {
    form.getValues();
    const { values, dirty, dirtyItems } = form.getValues();
    onSubmit(values, dirty, dirtyItems);
  };

  const renderForms = Object
    .keys(inputFileds)
    .map((key) => (
      <FormRow key={key}>
        {inputFileds[key]}
      </FormRow>
    ));

  return (
    <FormStyle onChange={handleOnChange} onSubmit={handleSubmit} onBlur={handleBlur} className={className}>
      { typeof children === 'function' && children(inputFileds, renderForms, onSubmitAction) }
      { typeof children !== 'function' && renderForms}
    </FormStyle>
  );
};

Form.defaultProps = defaultProps;
Form.propTypes = propTyps;
Form.displayName = '@asurgent.ui.Form';

export default Form;
