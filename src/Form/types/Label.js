import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Tooltip from '../../Tooltip';

import {
  TooltipIcon,
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
    value,
  } = props;

  const [labelValue, setLabelValue] = useState('');

  useEffect(() => {
    setLabelValue(value);
  }, [value]);

  return (
    <Main>
      { noLabel === false && (
      <Header>
        <InputLabel>{label || name}</InputLabel>
        { tooltip && (
        <Tooltip.Middle tip={tooltip}>
          <TooltipIcon />
        </Tooltip.Middle>
        )}
      </Header>
      )}
      <Wrapper style={{ opacity: '.4' }}>
        { labelValue }
      </Wrapper>
    </Main>
  );
};

Label.defaultProps = defaultProps;
Label.propTypes = propTyps;
Label.displayName = '@asurgent.ui.Form.Label';

export default Label;
