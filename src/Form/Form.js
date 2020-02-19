import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormStyle, FormRow } from './Form.styled';
import { withDelayTimer } from './helpers';

const timer = (callback, msTimer) => () => withDelayTimer((values, dirty, dirtyItems) => {
  callback(values, dirty, dirtyItems);
}, msTimer);

const propTyps = {
  msTimer: PropTypes.number,
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
  onChangeTimer: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyUpTimer: PropTypes.func,
};

const defaultProps = {
  msTimer: 950,
  children: null,
  className: '',
  onChange: () => {},
  onSubmit: () => {},
  onFocusChange: () => {},
  onChangeTimer: () => {},
  onKeyUp: () => {},
  onKeyUpTimer: () => {},
};

const Form = (props) => {
  const {
    form,
    children,
    msTimer,
    onSubmit,
    onFocusChange,
    onChange,
    onChangeTimer,
    onKeyUp,
    onKeyUpTimer,
    className,
  } = props;

  const [keyPressTimer] = useState(timer(onKeyUpTimer, msTimer));
  const [changeTimer] = useState(timer(onChangeTimer, msTimer));

  if (!form || typeof form !== 'object' || !form.inputFileds) {
    return null;
  }

  const { inputFileds } = form;

  const handleOnChange = (event) => {
    const { name } = event.target;
    const { values, dirty, dirtyItems } = form.getValues();

    changeTimer(values, dirty, dirtyItems);
    onChange(values, dirty, dirtyItems, name);
  };

  const handleOnKeyUp = (event) => {
    const { name } = event.target;
    const { values, dirty, dirtyItems } = form.getValues();

    keyPressTimer(values, dirty, dirtyItems);
    onKeyUp(values, dirty, dirtyItems, name);
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
    <FormStyle
      onKeyUp={handleOnKeyUp}
      onChange={handleOnChange}
      onSubmit={handleSubmit}
      onBlur={handleBlur}
      className={className}
    >
      { typeof children === 'function' && children(inputFileds, renderForms, onSubmitAction) }
      { typeof children !== 'function' && renderForms}
    </FormStyle>
  );
};

Form.defaultProps = defaultProps;
Form.propTypes = propTyps;
Form.displayName = '@asurgent.ui.Form';

export default Form;
