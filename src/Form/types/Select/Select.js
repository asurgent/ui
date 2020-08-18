import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Icons from '@material-ui/icons';

const propTyps = {
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.instanceOf(Object)).isRequired,
  props: PropTypes.instanceOf(Object),
  placeholder: PropTypes.string,
};

const defaultProps = {
  value: '',
  props: {},
  placeholder: '',
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
  } = props;

  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(props.value || '');
    // also reset value if options change over time
  }, [props.value, props.options]);

  useEffect(() => {
    // only set default value if doesn't have empty option
    if (!placeholder) {
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
        value={value}
        name={name}
        ref={ref}
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
            disabled,
            disabledPreFix,
            disabledPostFix,
          }) => (
            <option key={`${optionLabel}-${value}`} value={optionValue} disabled={disabled}>
              {disabled && disabledPreFix}
              {optionLabel}
              {disabled && disabledPostFix}
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
