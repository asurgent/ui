import Permission, { PermissionContext } from './Permission';
import usePermission from './usePermissionHook';
import { hasPermission } from './helpers';

const Context = PermissionContext.Provider;

export {
  Permission as Render,
  Context,
  hasPermission,
  usePermission,
};
