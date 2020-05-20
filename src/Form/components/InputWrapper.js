import React from 'react';
import PropTypes from 'prop-types';
// import { i18next } from '../../../lib/i18n';
import i18next from 'i18next';
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
  type: PropTypes.string.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.instanceOf(Object),
  ]).isRequired,
  noLabel: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

const defaultProps = {
  label: '',
  noLabel: false,
  tooltip: '',
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
      <Wrapper type={type} hasError={Boolean(error)}>
        {children}
      </Wrapper>
      {error && (
        <Error>
          {
            i18next.exists(`${error.translationKey}`)
              ? i18next.t(error.translationKey)
              : error.message
          }
        </Error>
      )}
    </Main>
  );
};

Text.defaultProps = defaultProps;
Text.propTypes = propTyps;
Text.displayName = '@asurgent.ui.Form.InputWrapper';

export default Text;
