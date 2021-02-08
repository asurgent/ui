import {
  createContext,
  useContext,
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
  .reduce((acc, features) => [...new Set([...features, ...acc])], []);

const getRoles = (permissions) => Object.keys(permissions);

export const shouldGrantWithPermissions = (permissions, withRoles, withFeature) => {
  const features = getFeatures(permissions);
  const roles = getRoles(permissions);

  const hasRoles = Array.isArray(withRoles) && withRoles.length > 0;
  const hasFeatures = Array.isArray(withFeature) && withFeature.length > 0;

  if (hasFeatures || hasRoles) {
    if (hasRoles) {
      return withRoles.reduce((result, key) => {
        if (!result) {
          if (roles.includes(key)) {
            return true;
          }
        }

        return result;
      }, false);
    }

    return withFeature.reduce((result, key) => {
      if (!result) {
        if (features.includes(key)) {
          return true;
        }
      }

      return result;
    }, false);
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
  const render = useMemo(() => shouldGrantWithPermissions(permissions, withRoles, withFeature),

    [permissions, withFeature, withRoles]);
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
