import React, { forwardRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as Tooltip from '../../Tooltip';

import {
  Main,
  Wrapper,
  Label,
  Header,
  TooltipIcon,
} from './Text.styled';


const propTyps = {
  value: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  tooltip: PropTypes.string.isRequired,
  noLabel: PropTypes.bool,
  placeholder: PropTypes.string.isRequired,
  props: PropTypes.instanceOf(Object),
};

const defaultProps = {
  value: '',
  label: '',
  props: {},
  noLabel: false,
};

const Text = forwardRef((props, ref) => {
  const {
    label,
    name,
    tooltip,
    placeholder,
    noLabel,
  } = props;

  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(props.value || '');
  }, [props]);

  return (
    <Main>
      { noLabel === false && (
        <Header>
          <Label>{label || name}</Label>
          { tooltip && (
          <Tooltip.Middle tip={tooltip}>
            <TooltipIcon />
          </Tooltip.Middle>
          )}
        </Header>
      )}
      <Wrapper>
        <input
          {...props.props}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={({ target }) => setValue(target.value)}
          name={name}
          ref={ref}
        />
      </Wrapper>
    </Main>
  );
});

Text.defaultProps = defaultProps;
Text.propTypes = propTyps;
Text.displayName = '@asurgent.ui.Form.Input.Text';

export default Text;
