import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { withRouter, useLocation } from 'react-router-dom';
import { RingSpinner } from 'react-spinners-kit';
import * as Tooltip from '../../Tooltip/index';
import * as Styles from '../Button.styled';
import { isExternalLink, isInteralLink, isValidMail } from '../helper';

const propTyps = {
  iconLeft: PropTypes.element,
  iconRight: PropTypes.element,
  mainIcon: PropTypes.element,
  link: PropTypes.string,
  onClick: PropTypes.func,
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
};

const defaultProps = {
  iconLeft: null,
  iconRight: null,
  mainIcon: null,
  link: '',
  onClick: () => {},
  disabled: false,
  loading: false,
  children: null,
  mailto: '',
  tooltip: null,
  className: '',
  passLocationState: false,
};

const withButtonStyle = ({ style: Component, isHollow }) => {
  const ProxyButton = (props) => {
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
      theme,
      tooltip,
      passLocationState,
      className,
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
      className: [(disabled ? 'disabled' : null), className].join(' ').trim(),
      onClick: handleClick,
    };

    const content = (
      <>
        {mainIcon && mainIcon }
        {iconLeft && <Styles.Spacer right>{iconLeft}</Styles.Spacer>}
        {children}
        {iconRight && <Styles.Spacer left>{iconRight}</Styles.Spacer>}
        { loading && (
          <Styles.Spacer left>
            <RingSpinner
              color={isHollow ? theme.brandPrimaryColor : theme.white}
              size={15}
            />
          </Styles.Spacer>
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
        <Tooltip.Middle tip={tooltip}>
          <Link {...upddatedAttrs}>
            {content}
          </Link>
        </Tooltip.Middle>
      );
    }

    return (
      <Tooltip.Middle tip={tooltip}><Component {...attrs}>{content}</Component></Tooltip.Middle>
    );
  };

  ProxyButton.defaultProps = defaultProps;
  ProxyButton.propTypes = propTyps;

  return withTheme(withRouter(ProxyButton));
};

export default withButtonStyle;
