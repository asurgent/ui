import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  withFeature: PropTypes.instanceOf(Object),
  withRoles: PropTypes.instanceOf(Array),
  children: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  fallback: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

const defaultProps = {
  withFeature: {},
  withRoles: [],
  children: null,
  fallback: null,
};

const getFeatures = (permissions) => Object.values(permissions)
  .reduce((acc, features) => {
    const merged = Object.keys(features)
      .reduce((all, key) => {
        if (!all[key]) {
          return { ...all, [key]: features[key] };
        }

        const featureList = [...new Set([...features[key], ...all[key]])];

        return { ...all, [key]: featureList };
      }, acc);

    return merged;
  }, {});

const getRoles = (permissions) => Object.keys(permissions);

const isObject = (val) => {
  if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
    return true;
  }
  return false;
};

export const shouldRender = (roles, permissions, withRoles, withFeature) => {
  const hasFeatures = isObject(withFeature) && Object.keys(withFeature).length > 0;
  const hasRoles = Array.isArray(withRoles) && withRoles.length > 0;

  if (hasFeatures || hasRoles) {
    if (hasRoles) {
      const res = withRoles.reduce((result, key) => {
        if (!result) {
          if (roles.includes(key)) {
            return true;
          }
        }

        return result;
      }, false);
      return res;
    }

    return Object.entries(withFeature)
      .reduce((result, [key, features]) => {
        if (!result) {
          if (permissions?.[key]) {
            if (features.length > 0) {
              const matches = features.filter((obj) => permissions[key].includes(obj));
              return matches.length > 0;
            }

            return true;
          }
        }

        return result;
      }, false);
  } if (withFeature.length === 0) {
    return true;
  }

  return true;
};

export const PermissionContext = createContext({});

const Permission = ({
  fallback,
  children,
  withRoles,
  withFeature,
}) => {
  const permissions = useContext(PermissionContext);
  const features = useMemo(() => getFeatures(permissions), [permissions]);
  const roles = useMemo(() => getRoles(permissions), [permissions]);
  const render = useMemo(() => shouldRender(roles, features, withRoles, withFeature),
    [features, roles, withFeature, withRoles]);

  if (render) {
    const renderChildren = () => (typeof children === 'function' ? children() : children);
    return renderChildren();
  }

  return fallback;
};

Permission.propTypes = propTypes;
Permission.defaultProps = defaultProps;
Permission.displayName = '@asurgent.ui.Permission.Main';

export default Permission;
