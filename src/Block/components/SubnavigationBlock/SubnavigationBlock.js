import React from 'react';
import PropTypes from 'prop-types';
import * as C from './SubnavigationBlock.styled';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  navigationList: PropTypes.instanceOf(Array).isRequired,
  title: PropTypes.string,
};

const defaultProps = {
  children: null,
  title: null,
};

const SubnavigationBlock = ({ navigationList, title, children }) => (
  <C.Wrapper>
    { title && <C.Title>{title}</C.Title> }
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
