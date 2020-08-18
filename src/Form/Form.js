import React, { useState, useEffect, createContext } from 'react';
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

export const FormContext = createContext({ hook: null });

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

          // rerender, othwerwise values wont change on reset
          hook.renderItems(resetValues);
          // sends the reset-values back to the Forms onChange event
          onChange(resetValues, false, resetDirtyItems, null);
        },
      });
    }

    // Empty errors list on unmount
    return () => {
      hook.errors([]);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { inputFileds } = hook;

  const eventTrigger = ({
    name = null, timerAction = null, action = null, reRender = false, setDirty = true,
  }) => {
    // setTimeout needed for render-dependencies in the form
    // (e.g. field X depends on the value for field Y)
    setTimeout(() => {
      const { values, dirty, dirtyItems } = hook.getValues();
      if (setDirty) {
        setIsDirty(dirty);
      }
      if (reRender) {
        hook.renderItems(values);
      }
      if (timerAction) {
        timerAction(values, dirty, dirtyItems);
      }
      action(values, dirty, dirtyItems, name);
    }, 0);
  };

  const onSubmitAction = () => {
    hook.blurFields();
    eventTrigger({ action: onSubmit, setDirty: false });
  };

  const onResetAction = () => {
    setIsDirty(false);
    hook.blurFields();
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
        eventTrigger({ name, timerAction: keyPressTimer, action: onKeyUp });
      }}
      onKeyDown={(event) => {
        const { name } = event.target;
        eventTrigger({ name, timerAction: keyPressTimer, action: onKeyDown });
      }}
      onChange={(event) => {
        const { name } = event.target;
        // Will trigger a rerender of form based on
        // input field render property
        eventTrigger({
          name, timerAction: changeTimer, action: onChange, reRender: true,
        });
      }}
      onSubmit={(event) => {
        event.preventDefault();
        eventTrigger({ action: onSubmit, setDirty: false });
      }}
      onFocus={(event) => {
        const { name } = event.target;
        eventTrigger({ name, action: onFocus, setDirty: false });
      }}
      onBlur={(event) => {
        const { name } = event.target;
        eventTrigger({ name, action: onBlur, setDirty: false });
      }}
      className={className}
    >
      <FormContext.Provider value={{ hook }}>
        { typeof children === 'function' && children(inputFileds, renderForms, onSubmitAction, onResetAction, isDirty) }
        { typeof children !== 'function' && renderForms}
      </FormContext.Provider>
    </FormStyle>
  );
};

Form.defaultProps = defaultProps;
Form.propTypes = propTyps;
Form.displayName = '@asurgent.ui.Form';

export default Form;
