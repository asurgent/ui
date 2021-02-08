import { useContext } from 'react';
import { PermissionContext } from './Permission';

const usePermissionHook = () => {
  const permissions = useContext(PermissionContext);

  return {
    isGlobalAdmin: () => {
      console.log(permissions);

      return Object.keys(permissions)
        .find((key) => key === permissions.globalAdminKey);
    },
  };
};

export default usePermissionHook;
