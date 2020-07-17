import React from 'react';
import PropTypes from 'prop-types';
import * as C from './SubnavigationBlock.styled';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  navigationList: PropTypes.instanceOf(PropTypes.Array).isRequired,
};

const defaultProps = {
  children: null,
};

const SubnavigationBlock = ({ navigationList, children }) => (
  <C.Wrapper>
    <C.Navigation>
      {
        navigationList.map(({
          path,
          icon,
          label,
          isActive,
        }) => (
          <C.NavigationItem to={path} key={path} isActive={isActive}>
            <C.Icon>{icon}</C.Icon>
            <C.Label>{label}</C.Label>
          </C.NavigationItem>
        ))
      }
    </C.Navigation>
    <C.Content>
      {children}
    </C.Content>
  </C.Wrapper>
);

SubnavigationBlock.propTypes = propTypes;
SubnavigationBlock.defaultProps = defaultProps;
SubnavigationBlock.displayName = '@asurgent.ui.Block.SubnavigationBlock';

export default SubnavigationBlock;
