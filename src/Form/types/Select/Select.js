import React, {
  useState,
  useEffect,
  createRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';
import * as Icons from '@material-ui/icons';

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

const getDefaultSort = (sortKeys) => {
  if (Array.isArray(sortKeys) && sortKeys.length > 0) {
    const sort = sortKeys.find(({ default: sortByDefault }) => sortByDefault);

    if (sort) {
      return sort.value;
    }

    const first = sortKeys[0];
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
      setValue(getDefaultSort(options));
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
            disabledOption,
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
      <Icons.ArrowDropDown className="down-arrow" fontSize="large" />
    </>
  );
});

Select.defaultProps = defaultProps;
Select.propTypes = propTyps;
Select.displayName = '@asurgent.ui.Form.Input.Select';

export default Select;
