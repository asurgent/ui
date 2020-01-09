import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { withRouter, useLocation } from 'react-router-dom';
import { RingSpinner } from 'react-spinners-kit';
import Tooltip from '../Tooltip/index';
import { LoaderSpacer } from './Button.styled';
import { isExternalLink, isInteralLink, isValidMail } from './helper';

const propTyps = {
  iconLeft: PropTypes.element,
  iconRight: PropTypes.element,
  link: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  mailto: PropTypes.string,
  tooltip: PropTypes.string,
  passLocationState: PropTypes.bool,
  history: PropTypes.instanceOf(Object).isRequired,
  theme: PropTypes.instanceOf(Object).isRequired,
};

const defaultProps = {
  iconLeft: null,
  iconRight: null,
  link: '',
  onClick: () => {},
  disabled: false,
  loading: false,
  children: null,
  mailto: '',
  tooltip: null,
  passLocationState: false,
};

const withButtonStyle = ({ style: Component, isHollow }) => {
  const ProxyButton = (props) => {
    const {
      iconRight,
      iconLeft,
      link,
      onClick,
      disabled,
      loading,
      children,
      mailto,
      history,
      theme,
      tooltip,
      passLocationState,
    } = props;

    const location = useLocation();
    const isValidLink = (link && (isExternalLink(link) || isInteralLink(link)));
    const isValidMailto = mailto && (isValidMail(mailto));

    const handleClick = (event) => {
      if (!disabled) {
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
      className: disabled ? 'disabled' : null,
      onClick: handleClick,
    };

    const content = (
      <>
        {iconLeft}
        {children}
        {iconRight}
        { loading && (
          <LoaderSpacer>
            <RingSpinner
              color={isHollow ? theme.brandPrimaryColor : theme.white}
              size={15}
            />
          </LoaderSpacer>
        )}
      </>
    );

    // If we pass a link/mailto, convert component to a-tag
    if (isValidLink || isValidMailto) {
      const Link = Component.withComponent('a');
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
        <Tooltip tip={tooltip}>
          <Link {...upddatedAttrs}>
            {content}
          </Link>
        </Tooltip>
      );
    }

    return (
      <Tooltip tip={tooltip}><Component {...attrs}>{content}</Component></Tooltip>
    );
  };

  ProxyButton.defaultProps = defaultProps;
  ProxyButton.propTypes = propTyps;

  return withTheme(withRouter(ProxyButton));
};

export default withButtonStyle;
