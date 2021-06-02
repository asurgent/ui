import React, {
  useState,
  useEffect,
  createRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import MdiIcon from '@mdi/react';
import { mdiMenuDown } from '@mdi/js';

const propTyps = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  props: PropTypes.instanceOf(Object),
  placeholder: PropTypes.string,
  parseOutput: PropTypes.func,
  disabled: PropTypes.func,
};

const defaultProps = {
  value: '',
  props: {},
  placeholder: '',
  parseOutput: (v) => v,
  disabled: () => false,
};

const getDefaultValue = (options) => {
  if (Array.isArray(options) && options.length > 0) {
    const defaultOption = options.find(({ default: isDefault }) => isDefault);

    if (defaultOption) {
      return defaultOption.value;
    }

    const first = options.find((option) => !option.disabled);
    return first.value;
  }

  return null;
};

const Select = forwardRef((props, ref) => {
  const {
    name,
    options,
    placeholder,
    parseOutput,
    disabled,
  } = props;

  const input = createRef();
  const [value, setValue] = useState(props.value || '');

  useImperativeHandle(ref, () => ({
    value: () => parseOutput(value),
    focus: () => input.current.focus(),
    blur: () => input.current.blur(),
  }));

  useEffect(() => {
    setValue(props.value || '');
    // also reset value if options change over time
  }, [props.value, props.options]);

  useEffect(() => {
    // only set "default value" if it doesnt have a inital prop-value AND
    // not uses a placeholder like 'Select me'
    if (!placeholder && !props.value) {
      setValue(getDefaultValue(options));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <select
        {...props.props}
        type="select"
        onChange={({ target }) => setValue(target.value)}
        value={value || ''}
        name={name}
        disabled={disabled()}
      >
        {placeholder && (
        <option disabled value="">
          {placeholder}
        </option>
        )}
        { Array.isArray(options) && options
          .map(({
            value: optionValue,
            label: optionLabel,
            key,
            disabled: disabledOption,
            disabledPreFix,
            disabledPostFix,
          }) => (
            <option key={key || `${optionLabel}-${value}`} value={optionValue} disabled={disabledOption}>
              {disabledOption && disabledPreFix}
              {optionLabel}
              {disabledOption && disabledPostFix}
            </option>
          ))}
      </select>
      <MdiIcon path={mdiMenuDown} size={0.75} className="down-arrow" />
    </>
  );
});

Select.defaultProps = defaultProps;
Select.propTypes = propTyps;

export default Select;
