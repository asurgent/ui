import React from 'react';
import PropTypes from 'prop-types';
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
  className: PropTypes.string,
  classNameWrapper: PropTypes.string,
  type: PropTypes.string.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.instanceOf(Object),
  ]).isRequired,
  noLabel: PropTypes.bool,
  tooltipPosition: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  disabled: PropTypes.func,
};

const defaultProps = {
  label: '',
  tooltip: '',
  noLabel: false,
  className: '',
  classNameWrapper: '',
  tooltipPosition: 'middle',
  disabled: () => false,
};

const InputWrapper = (props) => {
  const {
    label,
    tooltip,
    tooltipPosition,
    error,
    children,
    noLabel,
    type,
    className,
    classNameWrapper,
    disabled,
  } = props;

  return (
    <Main type={type} className={className}>
      { noLabel === false && (
        <Header>
          <Label>{label}</Label>
          { tooltip && (
            <Tooltip.Primary tip={tooltip} position={tooltipPosition}>
              <TooltipIcon />
            </Tooltip.Primary>
          )}
        </Header>
      )}
      <Wrapper disabled={disabled()} hasError={Boolean(error)} className={classNameWrapper}>
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

InputWrapper.defaultProps = defaultProps;
InputWrapper.propTypes = propTyps;
InputWrapper.displayName = '@asurgent.ui.Form.InputWrapper';

export default InputWrapper;
