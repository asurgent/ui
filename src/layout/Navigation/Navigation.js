import React from 'react';
import withTheme from '../../../high-order-components/withTheme';
import PropTypes from 'prop-types';
import MdiIcon from '@mdi/react';
import * as C from './Navigation.styled';
import * as Tooltip from '../../Tooltip';

const propTypes = {
  // theme: PropTypes.instanceOf(Object), // Passed to high-order-components/withTheme
  navigationList: PropTypes.instanceOf(Array).isRequired,
  withLabel: PropTypes.bool,
  onNavigate: PropTypes.func,
};

const defaultProps = {
  withLabel: false,
  onNavigate: (() => {}),
};

const Navigation = ({
  withLabel,
  navigationList,
  onNavigate,
}) => (
  <C.Wrapper>
    {
      navigationList.map(({
        icon,
        tooltip,
        link,
        label,
        isActive,
      }) => (
        <Tooltip.Right tip={tooltip} key={tooltip}>
          <C.NavigationItem to={link} onClick={onNavigate} isActive={isActive}>
            <MdiIcon path={icon} size={1.4} />
            {' '}
            {withLabel && (<span>{label}</span>)}
          </C.NavigationItem>
        </Tooltip.Right>
      ))
    }
  </C.Wrapper>
);

Navigation.propTypes = propTypes;
Navigation.defaultProps = defaultProps;

export default withTheme()(Navigation);
