import React from 'react';
import PropTypes from 'prop-types';
import * as C from './SubnavigationBlock.styled';
import * as T from '../../../Typography';

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
    { title && <T.Title.H1>{title}</T.Title.H1> }
    <C.Navigation>
      {
        navigationList.map((page) => {
          if (!page) { return null; }
          const {
            path,
            icon,
            label,
            isActive,
            iconStyle,
            navigationStyle,
            labelStyle,
          } = page;

          return (
            <C.NavigationItem style={navigationStyle} to={path} key={path} isActive={isActive}>
              <C.Icon style={iconStyle}>{icon}</C.Icon>
              <C.Label style={labelStyle}>{label}</C.Label>
            </C.NavigationItem>
          );
        })
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
