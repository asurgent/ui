import React from 'react';
import PropTypes from 'prop-types';
import * as C from './Block.styled';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func.isRequired,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  renderTransparent: PropTypes.bool,
  withMargins: PropTypes.bool,
  withBottomMargin: PropTypes.bool,
};
const defaultProps = {
  children: null,
  renderTransparent: false,
  withMargins: false,
  withBottomMargin: false,
};

export const Center = ({
  children, renderTransparent, withMargins, withBottomMargin,
}) => (
  <C.Center
    renderTransparent={renderTransparent}
    withMargins={withMargins}
    withBottomMargin={withBottomMargin}
  >
    {children}
  </C.Center>
);
Center.propTypes = propTypes;
Center.defaultProps = defaultProps;

export const Left = ({
  children, renderTransparent, withMargins, withBottomMargin,
}) => (
  <C.Left
    renderTransparent={renderTransparent}
    withMargins={withMargins}
    withBottomMargin={withBottomMargin}
  >
    {children}
  </C.Left>
);
Left.propTypes = propTypes;
Left.defaultProps = defaultProps;

export const Right = ({
  children, renderTransparent, withMargins, withBottomMargin,
}) => (
  <C.Right
    renderTransparent={renderTransparent}
    withMargins={withMargins}
    withBottomMargin={withBottomMargin}
  >
    {children}
  </C.Right>
);
Right.propTypes = propTypes;
Right.defaultProps = defaultProps;

export const Bordered = ({
  children, renderTransparent, withMargins, withBottomMargin,
}) => (
  <C.Bordered
    renderTransparent={renderTransparent}
    withMargins={withMargins}
    withBottomMargin={withBottomMargin}
  >
    {children}
  </C.Bordered>
);
Bordered.propTypes = propTypes;
Bordered.defaultProps = defaultProps;

export const Plain = ({
  children, renderTransparent, withMargins, withBottomMargin,
}) => (
  <C.Plain
    renderTransparent={renderTransparent}
    withMargins={withMargins}
    withBottomMargin={withBottomMargin}
  >
    {children}
  </C.Plain>
);
Plain.propTypes = propTypes;
Plain.defaultProps = defaultProps;

export const SpaceBetween = ({
  children, renderTransparent, withMargins, withBottomMargin,
}) => (
  <C.SpaceBetween
    renderTransparent={renderTransparent}
    withMargins={withMargins}
    withBottomMargin={withBottomMargin}
  >
    {children}
  </C.SpaceBetween>
);
SpaceBetween.propTypes = propTypes;
SpaceBetween.defaultProps = defaultProps;

export const Stretch = ({
  children, renderTransparent, withMargins, withBottomMargin,
}) => (
  <C.Stretch
    renderTransparent={renderTransparent}
    withMargins={withMargins}
    withBottomMargin={withBottomMargin}
  >
    {children}
  </C.Stretch>
);
Stretch.propTypes = propTypes;
Stretch.defaultProps = defaultProps;

export const Wrap = ({
  children, renderTransparent, withMargins, withBottomMargin, wrapReverse,
}) => (
  <C.Wrap
    wrapReverse={wrapReverse}
    renderTransparent={renderTransparent}
    withMargins={withMargins}
    withBottomMargin={withBottomMargin}
  >
    {children}
  </C.Wrap>
);
Wrap.propTypes = { ...propTypes, wrapReverse: PropTypes.bool };
Wrap.defaultProps = { ...defaultProps, wrapReverse: false };

export const WrapGrid = ({
  children,
  renderTransparent,
  withMargins,
  withBottomMargin,
  columnMinWidth,
  gridGap,
  stretchColumns,
}) => (
  <C.WrapGrid
    renderTransparent={renderTransparent}
    withMargins={withMargins}
    withBottomMargin={withBottomMargin}
    columnMinWidth={columnMinWidth}
    gridGap={gridGap}
    stretchColumns={stretchColumns}
  >
    {children}
  </C.WrapGrid>
);
WrapGrid.propTypes = {
  ...propTypes,
  columnMinWidth: PropTypes.number,
  gridGap: PropTypes.number,
  stretchColumns: PropTypes.bool,
};
WrapGrid.defaultProps = {
  ...defaultProps,
  columnMinWidth: 0,
  gridGap: 0,
  stretchColumns: false,
};
