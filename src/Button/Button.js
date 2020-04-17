import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import * as Spinner from '../Spinner';
import * as Tooltip from '../Tooltip/index';
import * as Styles from './Button.styled';
import {
  isExternalLink, isInteralLink, isValidMail, fileSaver,
} from './helper';

const propTyps = {
  iconLeft: PropTypes.element,
  iconRight: PropTypes.element,
  mainIcon: PropTypes.element,
  link: PropTypes.string,
  onClick: PropTypes.func,
  saveToJson: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
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
  passLocationState: PropTypes.bool,
  history: PropTypes.instanceOf(Object).isRequired,
  theme: PropTypes.instanceOf(Object).isRequired,
  renderStyle: PropTypes.instanceOf(Object).isRequired,
};

const defaultProps = {
  iconLeft: null,
  iconRight: null,
  mainIcon: null,
  link: '',
  onClick: () => {},
  saveToJson: false,
  saveToFilename: '',
  disabled: false,
  loading: false,
  children: null,
  mailto: '',
  tooltip: null,
  className: '',
  passLocationState: false,
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
    passLocationState,
    className,
    theme,
    saveToJson,
    saveToFilename,
    renderStyle: Style,
  } = props;

  const location = useLocation();
  const isValidLink = (link && (isExternalLink(link) || isInteralLink(link)));
  const isValidMailto = mailto && (isValidMail(mailto));

  const handleClick = async (event) => {
    if (!disabled) {
      if (saveToJson && typeof saveToJson === 'function') {
        const result = await saveToJson();
        fileSaver(result, saveToFilename, {
          type: 'application/json',
          fileExtension: 'json',
        });
      }

      if (onClick) {
        onClick(event);
      }


      if (isValidLink && isInteralLink(link)) {
        event.preventDefault();

        if (passLocationState) {
          history.push(`${link}${location.search}`);
        } else {
          history.push(link);
        }
      }
    } else {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const attrs = {
    className: [(disabled ? 'disabled' : null), className].join(' ').trim(),
    onClick: handleClick,
  };

  const content = (
    <>
      {mainIcon && mainIcon }
      {iconLeft && <Styles.Spacer right>{iconLeft}</Styles.Spacer>}
      <span className="label">{children}</span>
      {iconRight && <Styles.Spacer left>{iconRight}</Styles.Spacer>}
      { loading && (
      <Styles.Spacer left data-testid="ring-spinner">
        <Spinner.Ring size={15} color={theme.spinnerColor} />
      </Styles.Spacer>
      )}
    </>
  );

  // If we pass a link/mailto, convert component to a-tag
  if (isValidLink || isValidMailto) {
    const Link = Style.withComponent('a');
    const upddatedAttrs = { ...attrs };

    if (isValidLink) {
      if (passLocationState) {
        Object.assign(upddatedAttrs, {
          href: `${link}${location.search}`,
        });
      } else {
        Object.assign(upddatedAttrs, {
          href: link,
        });
      }
    } else if (isValidMailto) {
      Object.assign(upddatedAttrs, {
        href: `mailto:${mailto}`,
      });
    }

    if (isExternalLink(link)) {
      Object.assign(upddatedAttrs, {
        target: '_blank',
        rel: 'noopener noreferrer',
      });
    }

    return (
      <Tooltip.Middle tip={tooltip}>
        <Link {...upddatedAttrs}>
          {content}
        </Link>
      </Tooltip.Middle>
    );
  }

  return (
    <Tooltip.Middle tip={tooltip}>
      <Style {...attrs}>
        {content}
      </Style>
    </Tooltip.Middle>
  );
};

Button.defaultProps = defaultProps;
Button.propTypes = propTyps;

export default Button;
