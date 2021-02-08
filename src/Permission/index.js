import Permission, { PermissionContext, shouldGrantWithPermissions } from './Permission';
import usePermission from './usePermissionHook';

const Context = PermissionContext.Provider;

export default Permission;
export {
  Context as PermissionContext,
  shouldGrantWithPermissions,
  usePermission,
};
