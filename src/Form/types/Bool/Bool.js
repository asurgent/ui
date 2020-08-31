import React, {
  forwardRef,
  useState,
  useEffect,
  useMemo,
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
};

const defaultProps = {
  value: 'false',
  label: '',
  props: {},
};

const Bool = forwardRef((props, ref) => {
  const { name, label } = props;
  const { t } = translation;

  const [value, setValue] = useState();
  const parser = useCallback((val) => (val === 'true'), []);

  const options = useMemo(() => [
    { label: t('yes', 'asurgentui'), value: 'true' },
    { label: t('no', 'asurgentui'), value: 'false' },
  ], [t]);

  useEffect(() => {
    setValue(`${!!props.value}`);
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
    />
  );
});

Bool.defaultProps = defaultProps;
Bool.propTypes = propTyps;
Bool.displayName = '@asurgent.ui.Form.Input.Bool';

export default Bool;
