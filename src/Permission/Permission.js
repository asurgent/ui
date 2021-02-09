import {
  createContext,
  useContext,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import { hasPermission } from './helpers';

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

export const PermissionContext = createContext({});

const Permission = ({
  fallback,
  children,
  withRoles,
  withFeature,
}) => {
  const permissions = useContext(PermissionContext);
  const render = useMemo(() => hasPermission(permissions, withRoles, withFeature),

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
