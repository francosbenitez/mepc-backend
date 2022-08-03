User.prototype.hasRole = async function hasRole(role) {
  if (!role || role === "undefined") {
    return false;
  }
  const roles = await this.getRoles();
  return !!roles.map(({ name }) => name).includes(role);
};

User.prototype.hasPermission = async function hasPermission(permission) {
  if (!permission || permission === "undefined") {
    return false;
  }
  const permissions = await this.getPermissions();
  return !!permissions.map(({ name }) => name).includes(permission.name);
};

User.prototype.hasPermissionThroughRole =
  async function hasPermissionThroughRole(permission) {
    if (!permission || permission === "undefined") {
      return false;
    }
    const roles = await this.getRoles();
    // eslint-disable-next-line no-restricted-syntax
    for await (const item of permission.roles) {
      if (roles.filter((role) => role.name === item.name).length > 0) {
        return true;
      }
    }
    return false;
  };

User.prototype.hasPermissionTo = async function hasPermissionTo(permission) {
  if (!permission || permission === "undefined") {
    return false;
  }
  return (
    (await this.hasPermissionThroughRole(permission)) ||
    this.hasPermission(permission)
  );
};
