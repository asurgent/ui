import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '../../Tooltip';

import {
  Icon,
  Main,
  Label as InputLabel,
  Header,
  Wrapper,
} from './Text.styled';

const propTyps = {
  value: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
};

const defaultProps = {
  value: '',
};

const Label = forwardRef((props) => {
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
        <InputLabel>{label || name}</InputLabel>
        { tooltip && (
        <Tooltip tip={tooltip}>
          <Icon className="far fa-question-circle" />
        </Tooltip>
        )}
      </Header>
      <Wrapper style={{ opacity: '.4' }}>
        { value }
      </Wrapper>
    </Main>
  );
});

Label.defaultProps = defaultProps;
Label.propTypes = propTyps;
Label.displayName = '@asurgent.ui.Form.Label';

export default Label;
