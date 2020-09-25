import React from 'react';

const propTyps = {};
const defaultProps = {};

const withMapProps = (remapProps) => (Component) => {
  const MapPropsComponent = (props) => (<Component {...remapProps(props)} />);

  MapPropsComponent.defaultProps = defaultProps;
  MapPropsComponent.propTypes = propTyps;

  return MapPropsComponent;
};

export default withMapProps;
