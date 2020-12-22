import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import * as C from './SubnavigationBlock.styled';
import * as T from '../../../Typography';
import * as Button from '../../../Button';

const NavigationItem = Button.withStyle()(C.NavigationItem);

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

const propTypesNavGroup = {
  page: PropTypes.instanceOf(Object),
};

const defaultPropsNavGroup = {
  page: null,
};

const NavGroup = ({ page }) => {
  if (!page) { return null; }
  if (page.row) {
    return <>{page.row}</>;
  }

  const {
    path,
    label,
    isActive,
    navigationStyle,
    labelStyle,
  } = page;

  return (
    <NavigationItem
      link={path}
      isActive={isActive}
      style={navigationStyle}
      renderContentWithoutWrapper
    >
      <C.Label style={labelStyle}>{label}</C.Label>
    </NavigationItem>
  );
};

NavGroup.propTypes = propTypesNavGroup;
NavGroup.defaultProps = defaultPropsNavGroup;

const SubnavigationBlock = ({ navigationList, title, children }) => {
  const newNavigation = useMemo(() => {
    if (Array.isArray(navigationList[0])) {
      return navigationList.map((group, groupIndex) => (
        // eslint-disable-next-line react/no-array-index-key
        <C.Group key={groupIndex}>
          { group.map((page, pageIndex) => (
            <NavGroup
              page={page}
              // eslint-disable-next-line react/no-array-index-key
              key={`${page.path}${page.label}${pageIndex}`}
            />
          )) }
        </C.Group>
      ));
    }

    return (
      <C.Group>
        {navigationList.map((page) => <NavGroup page={page} key={page.path} />)}
      </C.Group>
    );
  }, [navigationList]);

  return (
    <C.Wrapper>
      { title && <T.Title.H1>{title}</T.Title.H1> }
      <C.Navigation>
        { newNavigation }
      </C.Navigation>
      <C.Content>
        { children }
      </C.Content>
    </C.Wrapper>
  );
};

SubnavigationBlock.propTypes = propTypes;
SubnavigationBlock.defaultProps = defaultProps;
SubnavigationBlock.displayName = '@asurgent.ui.Block.SubnavigationBlock';

export default SubnavigationBlock;
