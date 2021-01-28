import React, {
  forwardRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import RadioGroup from '../RadioGroup';
import translation from './Bool.translation';

const propTyps = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  props: PropTypes.instanceOf(Object),
  disabled: PropTypes.func,
  onChange: PropTypes.func,
};

const defaultProps = {
  value: false,
  label: '',
  props: {},
  disabled: () => false,
  onChange: () => null,
};

const { t } = translation;

const options = [
  { label: t('yes', 'asurgentui'), value: true },
  { label: t('no', 'asurgentui'), value: false },
];

const Bool = forwardRef((props, ref) => {
  const {
    name, label, disabled, onChange,
  } = props;

  const [value, setValue] = useState(props.value);
  const parser = useCallback((val) => (val === true), []);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <RadioGroup
      name={name}
      parseOutput={parser}
      value={value}
      label={label}
      options={options}
      ref={ref}
      props={props.props}
      disabled={disabled}
      onChange={onChange}
    />
  );
});

Bool.defaultProps = defaultProps;
Bool.propTypes = propTyps;
Bool.displayName = '@asurgent.ui.Form.Input.Bool';

export default Bool;
