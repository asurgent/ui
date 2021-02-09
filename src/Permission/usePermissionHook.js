import { useContext } from 'react';
import { PermissionContext } from './Permission';
import { hasPermission } from './helpers';

const usePermissionHook = () => {
  const permissions = useContext(PermissionContext);

  return {
    withFeatures: (features) => {
      if (typeof permissions === 'object' && permissions !== null) {
        if (Array.isArray(features)) {
          return hasPermission(permissions, [], features);
        }
        if (typeof features === 'string') {
          return hasPermission(permissions, [], [features]);
        }
      }
      return false;
    },
    withRoles: (roles) => {
      if (typeof permissions === 'object' && permissions !== null) {
        if (Array.isArray(roles)) {
          return hasPermission(permissions, roles, []);
        }
        if (typeof roles === 'string') {
          return hasPermission(permissions, [roles], []);
        }
      }
      return false;
    },
    isGlobalAdmin: () => {
      if (typeof permissions === 'object' && permissions !== null) {
        const { globalAdminKey, ...rest } = permissions;
        return Boolean(Object.keys(rest).find((key) => key === globalAdminKey));
      }
      return false;
    },
    getPermissions: () => permissions,
  };
};

export default usePermissionHook;
