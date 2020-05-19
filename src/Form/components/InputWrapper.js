import React from 'react';
import PropTypes from 'prop-types';
import * as Tooltip from '../../Tooltip';

import {
  Main,
  Wrapper,
  Label,
  Header,
  Error,
  TooltipIcon,
} from './InputWrapper.styled';


const propTyps = {
  tooltip: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.string,
  noLabel: PropTypes.bool,
};

const defaultProps = {
  label: '',
  noLabel: false,
  tooltip: '',
  error: '',
};

const Text = (props) => {
  const {
    label,
    tooltip,
    error,
    children,
    noLabel,
    type,
  } = props;


  return (
    <Main type={type}>
      { noLabel === false && (
        <Header>
          <Label>{label}</Label>
          { tooltip && (
          <Tooltip.Middle tip={tooltip}>
            <TooltipIcon />
          </Tooltip.Middle>
          )}
        </Header>
      )}
      {error && <Error>{error}</Error>}
      <Wrapper type={type}>
        {children}
      </Wrapper>
    </Main>
  );
};

Text.defaultProps = defaultProps;
Text.propTypes = propTyps;
Text.displayName = '@asurgent.ui.Form.Input.Text';

export default Text;
