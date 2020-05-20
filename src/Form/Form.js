import React, { useState, useEffect } from 'react';
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
    form: hook,
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

  const [isDirty, setIsDirty] = useState(false);
  const [keyPressTimer] = useState(timer(onKeyUpTimer, msTimer));
  const [changeTimer] = useState(timer(onChangeTimer, msTimer));

  if (!hook || typeof hook !== 'object' || !hook.inputFileds) {
    return null;
  }

  useEffect(() => {
    if (hook && hook.setResetCallback) {
      hook.setResetCallback({
        run: (resetData) => {
          const resetValues = Object.keys(resetData)
            .map((key) => ({ name: key, value: resetData[key].value }));
          const resetDirtyItems = Object.keys(resetData)
            .map((key) => ({ name: key, value: false }));
          onChange(resetValues, false, resetDirtyItems, null);
        },
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { inputFileds } = hook;

  const eventTrigger = (name, timerAction, action) => {
    setTimeout(() => {
      const { values, dirty, dirtyItems } = hook.getValues();
      setIsDirty(dirty);
      hook.renderItems(values);

      if (timerAction) {
        timerAction(values, dirty, dirtyItems);
      }
      action(values, dirty, dirtyItems, name);
    }, 0);
  };
  const onSubmitAction = () => {
    eventTrigger(null, null, onSubmit);
  };

  const onResetAction = () => {
    setIsDirty(false);
    hook.resetValues();
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
      onKeyUp={(event) => {
        const { name } = event.target;
        eventTrigger(name, keyPressTimer, onKeyUp);
      }}
      onKeyDown={(event) => {
        const { name } = event.target;
        eventTrigger(name, keyPressTimer, onKeyDown);
      }}
      onChange={(event) => {
        const { name } = event.target;
        eventTrigger(name, changeTimer, onChange);
      }}
      onSubmit={(event) => {
        event.preventDefault();
        eventTrigger(null, null, onSubmit);
      }}
      onFocus={(event) => {
        const { name } = event.target;
        eventTrigger(name, null, onFocus);
      }}
      onBlur={(event) => {
        const { name } = event.target;
        eventTrigger(name, null, onBlur);
      }}
      className={className}
    >
      { typeof children === 'function' && children(inputFileds, renderForms, onSubmitAction, onResetAction, isDirty) }
      { typeof children !== 'function' && renderForms}
    </FormStyle>
  );
};

Form.defaultProps = defaultProps;
Form.propTypes = propTyps;
Form.displayName = '@asurgent.ui.Form';

export default Form;
