import React from 'react';
import wrapDisplayName from 'recompose/wrapDisplayName';

const propTyps = {};
const defaultProps = {};

const withMapProps = (remapProps) => (Component) => {
  const MapPropsComponent = (props) => (<Component {...remapProps(props)} />);

  MapPropsComponent.defaultProps = defaultProps;
  MapPropsComponent.propTypes = propTyps;
  MapPropsComponent.displayName = wrapDisplayName(Component, 'withMapProps');

  return MapPropsComponent;
};

export default withMapProps;
