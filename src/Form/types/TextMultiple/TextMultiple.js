import React, {
  useState, forwardRef, createRef, useEffect, useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import Delete from '@material-ui/icons/DeleteForever';
import Add from '@material-ui/icons/Add';
import * as C from './TextMultiple.styled';
import * as Button from '../../../Button';

const propTypes = {
  value: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  parseOutput: PropTypes.func,
  validator: PropTypes.shape({
    condition: PropTypes.func,
    errorMessage: PropTypes.string,
  }),
};

const defaultProps = {
  value: [],
  placeholder: '',
  parseOutput: (v) => v.filter((entry) => entry !== ''),
  validator: {
    condition: () => true,
    errorMessage: '',
  },
};

const TextMultiple = forwardRef((props, ref) => {
  const {
    name,
    placeholder,
    parseOutput,
    validator,
  } = props;

  const [value, setValue] = useState([]);
  const [newEntry, setNewEntry] = useState('');

  useEffect(() => {
    setValue(props.value || []);
  }, [props.value]);

  const input = createRef();

  useImperativeHandle(ref, () => ({
    value: () => parseOutput(value),
    validator: () => validator.condition(value),
    validationErrorMessage: validator.errorMessage,
  }));

  const handleAdd = () => {
    const newArr = [...value, newEntry];
    setValue(newArr);
    setNewEntry('');
  };

  const handleRemove = ({ index }) => {
    const newArr = value.filter((el, ind) => ind !== index);
    setValue(newArr);
  };

  const handleChange = ({ target, index }) => {
    const newArr = value.map((ent, ind) => (ind === index ? target.value : ent));
    setValue(newArr);
  };

  const handleNewEntryChange = ({ target }) => {
    setNewEntry(target.value);
  };

  return (
    <C.Container>
      <C.HiddenInput
        ref={input}
        value={value}
        name={name}
        readOnly
      />
      {value.map((entry, index) => (
        /* eslint-disable-next-line react/no-array-index-key */
        <C.Entry key={index}>
          <input
            type="text"
            value={entry}
            onChange={({ target }) => handleChange({ target, index })}
          />
          <Button.Icon tooltip="Remove" icon={<Delete fontSize="large" onClick={() => handleRemove({ index })} />} />
        </C.Entry>
      ))}
      <C.Entry>
        <input
          type="text"
          placeholder={placeholder}
          value={newEntry}
          onChange={handleNewEntryChange}
          onKeyPress={({ key }) => {
            if (key === 'Enter') {
              handleAdd();
            }
          }}
        />
        <Button.Icon tooltip="Remove" icon={(<Add fontSize="large" onClick={handleAdd} />)} />
      </C.Entry>
    </C.Container>
  );
});

TextMultiple.propTypes = propTypes;
TextMultiple.defaultProps = defaultProps;

export default TextMultiple;
