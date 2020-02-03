import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Tooltip from '../../Tooltip';

import {
  Icon,
  Main,
  Label as InputLabel,
  Header,
  Wrapper,
} from './Text.styled';

const propTyps = {
  value: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
  noLabel: PropTypes.bool,
};

const defaultProps = {
  value: '',
  label: '',
  noLabel: false,
};

const Label = (props) => {
  const {
    label,
    name,
    tooltip,
    noLabel,
  } = props;

  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <Main>
      { noLabel === false && (
      <Header>
        <InputLabel>{label || name}</InputLabel>
        { tooltip && (
        <Tooltip.Middle tip={tooltip}>
          <Icon className="far fa-question-circle" />
        </Tooltip.Middle>
        )}
      </Header>
      )}
      <Wrapper style={{ opacity: '.4' }}>
        { value }
      </Wrapper>
    </Main>
  );
};

Label.defaultProps = defaultProps;
Label.propTypes = propTyps;
Label.displayName = '@asurgent.ui.Form.Label';

export default Label;
