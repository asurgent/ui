const getFeatures = (permissions) => Object.values(permissions)
  .reduce((acc, features) => [...new Set([...features, ...acc])], []);

const getRoles = (permissions) => Object.keys(permissions);

export const hasPermission = (permissions, withRoles, withFeature) => {
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
