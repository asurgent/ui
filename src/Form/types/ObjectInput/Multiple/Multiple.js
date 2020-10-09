import React, {
  forwardRef, useState, createRef, useImperativeHandle, useEffect,
} from 'react';
import PropTypes from 'prop-types';
import Delete from '@material-ui/icons/Block';
import Add from '@material-ui/icons/Add';
import * as C from '../ObjectInput.styled';
import * as Button from '../../../../Button';
import translation from '../ObjectInput.translation';
import InputWrapper from '../InputWrapper';
import { clearObjectValues } from '../helpers';

const { t } = translation;

const propTypes = {
  options: PropTypes.instanceOf(Object),
  value: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  name: PropTypes.string.isRequired,
  parseOutput: PropTypes.func,
  validator: PropTypes.shape({
    condition: PropTypes.func,
    errorMessage: PropTypes.string,
  }),
};

const defaultProps = {
  options: {},
  value: [],
  parseOutput: (v) => v,
  validator: {
    condition: () => true,
    errorMessage: '',
  },
};

const Multiple = forwardRef((props, ref) => {
  const {
    options, name, parseOutput, validator,
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

  useImperativeHandle(ref, () => ({
    value: () => parseOutput(value),
    validator: () => validator.condition(value),
    validationErrorMessage: validator.errorMessage,
  }));

  const handleChange = ({ target, index }) => {
    const newArr = value.map((ent, ind) => {
      if (ind === index) {
        return { ...ent, [target.name]: target.value };
      }
      return ent;
    });
    setValue(newArr);
  };

  const handleAdd = () => {
    const newValue = [...value, newEntry];
    setValue(newValue);
    setNewEntry(clearObjectValues(options));
  };

  const handleRemove = ({ index }) => {
    const newValue = value.filter((el, ind) => ind !== index);
    setValue(newValue);
  };

  const canAdd = Object.values(newEntry).every((ent) => ent !== '');

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
            return (
              <InputWrapper
                key={key}
                label={key}
                value={val}
                name={key}
                type={options[key] === 'number' ? 'number' : 'string'}
                onChange={({ target }) => handleChange({ target, index })}
              />
            );
          })}
          <C.ButtonContainer>
            <Button.Reject
              iconRight={<Delete />}
              onClick={() => handleRemove({ index })}
            >
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
            {Object.keys(newEntry).map((key, index) => (
              <InputWrapper
                /* eslint-disable-next-line react/no-array-index-key */
                key={index}
                name={key}
                label={key}
                value={newEntry[key]}
                type={options[key] === 'number' ? 'number' : 'string'}
                onChange={({ target }) => {
                  setNewEntry({ ...newEntry, [key]: target.value });
                }}
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
