import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, NavLink } from 'react-router-dom';
import * as Spinner from '../Spinner';
import * as Tooltip from '../Tooltip/index';
import * as Styles from './Button.styled';
import {
  isExternalLink,
  isInteralLink,
  isValidMail,
  fileSaver,
} from './helper';

const propTyps = {
  iconLeft: PropTypes.element,
  iconRight: PropTypes.element,
  mainIcon: PropTypes.element,
  link: PropTypes.string,
  onClick: PropTypes.func,
  saveToFile: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  saveToFilename: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  mailto: PropTypes.string,
  tooltip: PropTypes.string,
  className: PropTypes.string,
  clearLocationState: PropTypes.bool,
  history: PropTypes.instanceOf(Object).isRequired,
  theme: PropTypes.instanceOf(Object).isRequired,
  renderStyle: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string, // Add button[type="submit"] as an ovelay to native trigger in forms
  tooltipOrientation: PropTypes.string,
  style: PropTypes.instanceOf(Object),
  renderContentWithoutWrapper: PropTypes.bool,
};

const defaultProps = {
  iconLeft: null,
  iconRight: null,
  mainIcon: null,
  link: '',
  onClick: () => {},
  saveToFile: false,
  saveToFilename: '',
  disabled: false,
  loading: false,
  children: null,
  mailto: '',
  tooltip: null,
  className: '',
  clearLocationState: false,
  type: '',
  tooltipOrientation: 'middle',
  style: {},
  renderContentWithoutWrapper: false,
};

const propTypesTooltip = {
  tooltipOrientation: PropTypes.string,
  tooltip: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

const defaultPropsTooltip = {
  tooltipOrientation: '',
  tooltip: '',
};

const TooltipWrapper = ({ children, tooltipOrientation, tooltip }) => {
  if (!tooltip) {
    return children;
  }
  switch (tooltipOrientation) {
    case 'left':
      return (
        <Tooltip.Left tip={tooltip}>
          {children}
        </Tooltip.Left>
      );
    case 'right':
      return (
        <Tooltip.Right tip={tooltip}>
          {children}
        </Tooltip.Right>
      );
    default:
      return (
        <Tooltip.Middle tip={tooltip}>
          {children}
        </Tooltip.Middle>
      );
  }
};

const Button = (props) => {
  const {
    mainIcon,
    iconRight,
    iconLeft,
    link,
    onClick,
    disabled,
    loading,
    children,
    mailto,
    history,
    tooltip,
    tooltipOrientation,
    clearLocationState,
    className,
    theme,
    saveToFile,
    saveToFilename,
    type,
    style,
    renderStyle: Component,
    renderContentWithoutWrapper,
  } = props;

  const location = useLocation();
  const isValidMailto = mailto && (isValidMail(mailto));
  const tooltTipProps = { tooltip, tooltipOrientation };

  const handleClick = async (event) => {
    if (!disabled) {
      if (saveToFile && typeof saveToFile === 'function') {
        const result = await saveToFile();
        fileSaver({ data: result, fileName: saveToFilename });
      }

      if (onClick) {
        onClick(event);
      }

      if (isInteralLink(link)) {
        event.preventDefault();

        if (clearLocationState) {
          history.push(link);
        } else {
          history.push(`${link}${location.search}`);
        }
      }
    } else {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const attrs = {
    style,
    className: [(disabled ? 'disabled' : null), className].join(' ').trim(),
    onClick: handleClick,
    // onMouseDown needed because of onBlur on form fields
    onMouseDown: (e) => e.preventDefault(),
  };

  const content = (
    <>
      {mainIcon && mainIcon }
      {iconLeft && <Styles.Spacer right>{iconLeft}</Styles.Spacer>}
      {renderContentWithoutWrapper ? children : <span className="label">{children}</span>}
      {iconRight && <Styles.Spacer left>{iconRight}</Styles.Spacer>}
      { loading && (
      <Styles.Spacer left data-testid="ring-spinner">
        <Spinner.Ring size={15} color={theme.spinnerColor} />
      </Styles.Spacer>
      )}
    </>
  );

  // If we pass a link/mailto, convert component to a-tag
  if (isExternalLink(link) || isValidMailto) {
    const Link = Component.withComponent('a');
    const upddatedAttrs = { ...attrs };

    Object.assign(upddatedAttrs, {
      href: link,
      target: '_blank',
      rel: 'noopener noreferrer',
    });

    if (isValidMailto) {
      Object.assign(upddatedAttrs, {
        href: `mailto:${mailto}`,
      });
    }

    return (
      <TooltipWrapper {...tooltTipProps}>
        <Link {...upddatedAttrs}>
          {content}
        </Link>
      </TooltipWrapper>
    );
  }
  if (isInteralLink(link)) {
    const Link = Component.withComponent(NavLink);
    const upddatedAttrs = { ...attrs };

    if (clearLocationState) {
      Object.assign(upddatedAttrs, {
        to: link,
      });
    } else {
      Object.assign(upddatedAttrs, {
        to: `${link}${location.search}`,
      });
    }

    return (
      <TooltipWrapper {...tooltTipProps}>
        <Link {...upddatedAttrs}>
          {content}
        </Link>
      </TooltipWrapper>
    );
  }

  // If type "submit" is true we add a button[type="submit"]
  // overlay to trigger native submit in forms
  if (type === 'submit') {
    const { onClick: buttonOnClick, ...rest } = attrs;
    return (
      <TooltipWrapper {...tooltTipProps}>
        <Component {...rest}>
          <button onClick={buttonOnClick} type="submit">{' '}</button>
          {content}
        </Component>
      </TooltipWrapper>
    );
  }

  return (
    <TooltipWrapper {...tooltTipProps}>
      <Component {...attrs}>
        {content}
      </Component>
    </TooltipWrapper>
  );
};

Button.defaultProps = defaultProps;
Button.propTypes = propTyps;
TooltipWrapper.defaultProps = defaultPropsTooltip;
TooltipWrapper.propTypes = propTypesTooltip;

export default Button;
