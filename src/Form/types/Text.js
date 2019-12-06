import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../../Tooltip';

import {
  Main,
  Wrapper,
  Label,
  Header,
  Icon,
} from './Text.styled';

const propTyps = {
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
  props: PropTypes.instanceOf(Object),
};

const defaultProps = {
  value: '',
  props: {},
};

const Text = forwardRef((props, ref) => {
  const {
    label,
    name,
    tooltip,
  } = props;

  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <Main>
      <Header>
        <Label>{label || name}</Label>
        { tooltip && (
        <Tooltip tip={tooltip}>
          <Icon className="far fa-question-circle" />
        </Tooltip>
        )}
      </Header>
      <Wrapper>
        <input {...props.props} type="text" value={value} onChange={({ target }) => setValue(target.value)} name={name} ref={ref} />
      </Wrapper>
    </Main>
  );
});

Text.defaultProps = defaultProps;
Text.propTypes = propTyps;
Text.displayName = '@asurgent.ui.Form.Input.Text';

export default Text;
