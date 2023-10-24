const JsonResource = require('../json-resource');
const PermissionResource = require('./permission');
const RoleResource = require('./role');

module.exports = class UserResource extends JsonResource {
  static async getJsonAsync(instance) {
    return {
      id: instance.id,
      name: instance.name,
      email: instance.email,
      username: instance.username,
      is_active: instance.is_active,
      email_verified_at: instance.email_verified_at,
      created_at: instance.created_at,
      updated_at: instance.updated_at,

      roles: await RoleResource.getCollectionAsync(await instance.getRoles()),
      permissions: await PermissionResource.getCollectionAsync(
        await instance.getPermissions()
      )
    };
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      username: this.username,
      is_active: this.is_active,
      email_verified_at: this.email_verified_at,
      created_at: this.created_at,
      updated_at: this.updated_at,

      roles: RoleResource.collection(this.roles ?? []),
      permissions: PermissionResource.collection(this.permissions ?? [])
    };
  }
};
