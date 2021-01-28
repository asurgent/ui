import React, {
  useState, forwardRef, createRef, useEffect, useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import Delete from '@material-ui/icons/Block';
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
  onChange: PropTypes.func,
};

const defaultProps = {
  value: [],
  placeholder: '',
  parseOutput: (v) => v.filter((entry) => entry !== ''),
  validator: {
    condition: () => true,
    errorMessage: '',
  },
  onChange: () => null,
};

const TextMultiple = forwardRef((props, ref) => {
  const {
    name,
    placeholder,
    parseOutput,
    validator,
    onChange,
  } = props;

  const [value, setValue] = useState(props.value || []);
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
    console.log(1);
    const newArr = [...value, newEntry];
    setValue(newArr);
    setNewEntry('');
    onChange({ inputName: name, inputValue: newArr });
  };

  const handleRemove = ({ index }) => {
    const newArr = value.filter((el, ind) => ind !== index);
    setValue(newArr);
    onChange({ inputName: name, inputValue: newArr });
  };

  const handleChange = ({ target, index }) => {
    const newArr = value.map((ent, ind) => (ind === index ? target.value : ent));
    setValue(newArr);
    onChange({ inputName: name, inputValue: newArr });
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
          <Button.Icon icon={<Delete fontSize="large" onClick={() => handleRemove({ index })} />} />
        </C.Entry>
      ))}
      <C.Entry>
        <input
          type="text"
          placeholder={placeholder}
          value={newEntry}
          onChange={handleNewEntryChange}
          onKeyUp={({ key }) => {
            if (key === 'Enter' && newEntry.length > 0) {
              handleAdd();
            }
          }}
        />
        <Button.Icon disabled={newEntry.length === 0} onClick={handleAdd} icon={(<Add fontSize="large" />)} />
      </C.Entry>
    </C.Container>
  );
});

TextMultiple.propTypes = propTypes;
TextMultiple.defaultProps = defaultProps;

export default TextMultiple;
