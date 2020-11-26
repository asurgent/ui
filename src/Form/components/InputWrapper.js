import React from 'react';
import PropTypes from 'prop-types';
import i18next from 'i18next';
import * as Tooltip from '../../Tooltip';
import * as T from '../../Typography';

import {
  Main,
  Wrapper,
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
  showContainerError: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.string,
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
  style: PropTypes.instanceOf(Object),
  wrapperStyle: PropTypes.instanceOf(Object),
  description: PropTypes.string,
};

const defaultProps = {
  label: '',
  tooltip: '',
  noLabel: false,
  className: '',
  classNameWrapper: '',
  tooltipPosition: 'middle',
  showContainerError: true,
  disabled: () => false,
  style: {},
  wrapperStyle: {},
  description: '',
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
    showContainerError,
    disabled,
    wrapperStyle,
    style,
    description,
  } = props;

  return (
    <Main type={type} className={className} style={style}>
      { noLabel === false && (
        <Header>
          <T.P.Small capitalize bold style={{ margin: 0 }}>{label}</T.P.Small>
          { tooltip && (
            <Tooltip.Primary tip={tooltip} position={tooltipPosition}>
              <TooltipIcon />
            </Tooltip.Primary>
          )}
        </Header>
      )}
      { description && <T.P.Main style={{ margin: 0 }}>{description}</T.P.Main>}
      <Wrapper
        style={wrapperStyle}
        disabled={disabled()}
        hasError={showContainerError && Boolean(error)}
        type={type}
        className={classNameWrapper}
      >
        {children}
      </Wrapper>
      {showContainerError && error && (
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
