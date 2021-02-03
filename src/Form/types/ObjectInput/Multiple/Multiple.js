import React, {
  forwardRef, useState, createRef, useImperativeHandle, useEffect, useMemo,
} from 'react';
import PropTypes from 'prop-types';
import Delete from '@material-ui/icons/Block';
import Add from '@material-ui/icons/Add';
import * as C from '../ObjectInput.styled';
import * as Button from '../../../../Button';
import translation from '../ObjectInput.translation';
import InputComponent from '../InputComponent';
import {
  clearObjectValues,
  valuePassedValidation,
  valuesPassedValidation,
} from '../helpers';

const { t } = translation;

const propTypes = {
  options: PropTypes.instanceOf(Object),
  value: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  name: PropTypes.string.isRequired,
  parseOutput: PropTypes.func,
  validator: PropTypes.shape({
    conditions: PropTypes.func,
    errorMessage: PropTypes.string,
  }),
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.instanceOf(Object),
  ]),
};

const defaultProps = {
  options: {},
  value: [],
  parseOutput: (v) => v,
  validator: {
    conditions: () => true,
    errorMessage: '',
  },
  error: null,
};

const Multiple = forwardRef((props, ref) => {
  const {
    options, name, parseOutput, validator, error,
  } = props;
  const [value, setValue] = useState(props.value || []);
  const [newEntry, setNewEntry] = useState({});

  useEffect(() => {
    setNewEntry(clearObjectValues(options));
  }, [options]);

  useEffect(() => {
    setValue(props.value || []);
  }, [props.value]);

  const input = createRef();

  // trigger change event on form on add/remove button-clicks
  const dispatchEvent = (newValue) => {
    const element = input.current;
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    nativeInputValueSetter.call(element, newValue);
    const inputEvent = new Event('input', { bubbles: true });
    element.dispatchEvent(inputEvent);
  };

  useImperativeHandle(ref, () => ({
    validationErrorMessage: validator.errorMessage,
    value: () => parseOutput(value),
    validator: () => valuesPassedValidation({ validators: validator.conditions(), value }),
  }));

  const handleChange = ({ inputName, inputValue }, index) => {
    const newArr = value.map((ent, ind) => {
      if (ind === index) {
        return { ...ent, [inputName]: inputValue };
      }
      return ent;
    });
    setValue(newArr);
  };

  const handleChangeNewEntry = ({ inputName, inputValue }) => {
    setNewEntry({ ...newEntry, [inputName]: inputValue });
  };

  const handleAdd = () => {
    const newValue = [...value, newEntry];
    setValue(newValue);
    setNewEntry(clearObjectValues(options));
    dispatchEvent(newValue);
  };

  const handleRemove = ({ index }) => {
    const newValue = value.filter((v, ind) => ind !== index);
    setValue(newValue);
    dispatchEvent(newValue);
  };

  const canAdd = useMemo(() => valuePassedValidation({
    validators: validator.conditions(),
    value: newEntry,
  }), [newEntry, validator]);

  return (
    <C.Container>
      <input
        style={{ display: 'none' }}
        ref={input}
        value={value}
        name={name}
        readOnly
      />

      {/* Value-array */}
      {value.map((entry, index) => (
        /* eslint-disable-next-line react/no-array-index-key */
        <C.Entry key={index}>
          <h5>{`${t('entry', 'asurgentui')} ${index + 1}`}</h5>

          {/* Loop over key-value pair */}
          {Object.keys(entry).map((key) => {
            const val = entry[key];
            const option = options[key];
            const entryValidator = validator?.conditions()[key];
            return (
              <InputComponent
                /* eslint-disable-next-line react/no-array-index-key */
                key={`${key}-${index}`}
                name={key}
                option={option}
                type={option.type}
                value={val}
                label={option.label}
                options={option.options}
                disabled={option.disabled}
                render={option.render}
                validator={error ? entryValidator : null}
                placeholder={option.placeholder}
                onChange={(target) => handleChange(target, index)}
                tooltip={option.tooltip}
                props={option.props}
              />
            );
          })}

          <C.ButtonContainer>
            <Button.Reject iconRight={<Delete />} onClick={() => handleRemove({ index })}>
              {t('remove', 'asurgentui')}
            </Button.Reject>
          </C.ButtonContainer>
        </C.Entry>
      ))}

      {/* Options, for new ones */}
      {Object.keys(options).length > 0 && (
        <C.Entry>
          <h5>{t('addNew', 'asurgentui')}</h5>

          {/* Loop over newEntry key-value pairs (options) */}
          {Object.keys(options).map((key) => (
            <InputComponent
              key={key}
              name={key}
              label={options[key].label}
              value={newEntry[key] || null}
              type={options[key].type}
              onChange={handleChangeNewEntry}
              disabled={options[key].disabled}
              render={options[key].render}
              options={options[key].options}
              tooltip={options[key].tooltip}
              placeholder={options[key].placeholder}
            />
          ))}
          <C.ButtonContainer>
            <Button.Hollow
              iconRight={<Add />}
              disabled={!canAdd}
              onClick={handleAdd}
            >
              {t('add', 'asurgentui')}
            </Button.Hollow>
          </C.ButtonContainer>
        </C.Entry>
      )}

    </C.Container>
  );
});

Multiple.propTypes = propTypes;
Multiple.defaultProps = defaultProps;

export default Multiple;
