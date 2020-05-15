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
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onChangeTimer: PropTypes.func,
  onKeyUp: PropTypes.func,
  onKeyDown: PropTypes.func,
  onKeyUpTimer: PropTypes.func,
};

const defaultProps = {
  msTimer: 950,
  children: null,
  className: '',
  onChange: () => {},
  onSubmit: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onChangeTimer: () => {},
  onKeyUp: () => {},
  onKeyDown: () => {},
  onKeyUpTimer: () => {},
};

const Form = (props) => {
  const {
    form,
    children,
    msTimer,
    onSubmit,
    onFocus,
    onBlur,
    onChange,
    onChangeTimer,
    onKeyUp,
    onKeyDown,
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

    // setTimeout, 0 fix for native radiobuttons not updating correctly
    setTimeout(() => {
      const { values, dirty, dirtyItems } = form.getValues();
      form.renderItems(values);
      changeTimer(values, dirty, dirtyItems);
      onChange(values, dirty, dirtyItems, name);
    }, 0);
  };

  const handleOnKeyUp = (event) => {
    const { name } = event.target;
    const { values, dirty, dirtyItems } = form.getValues();

    keyPressTimer(values, dirty, dirtyItems);
    onKeyUp(values, dirty, dirtyItems, name);
  };

  const handleOnKeyDown = (event) => {
    const { name } = event.target;
    const { values, dirty, dirtyItems } = form.getValues();

    keyPressTimer(values, dirty, dirtyItems);
    onKeyDown(event, values, dirty, dirtyItems, name);
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    const { values, dirty, dirtyItems } = form.getValues();

    onBlur(values, dirty, dirtyItems, name);
  };

  const handleFocus = (event) => {
    const { name } = event.target;
    const { values, dirty, dirtyItems } = form.getValues();

    onFocus(values, dirty, dirtyItems, name);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { values, dirty, dirtyItems } = form.getValues();
    onSubmit(values, dirty, dirtyItems);
  };

  const onSubmitAction = () => {
    const { values, dirty, dirtyItems } = form.getValues();
    onSubmit(values, dirty, dirtyItems);
  };

  const onResetAction = () => {
    form.resetValues();
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
      onKeyDown={handleOnKeyDown}
      onChange={handleOnChange}
      onSubmit={handleSubmit}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={className}
    >
      { typeof children === 'function' && children(inputFileds, renderForms, onSubmitAction, onResetAction) }
      { typeof children !== 'function' && renderForms}
    </FormStyle>
  );
};

Form.defaultProps = defaultProps;
Form.propTypes = propTyps;
Form.displayName = '@asurgent.ui.Form';

export default Form;
