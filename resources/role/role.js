const JsonResource = require('../json-resource');
const PermissionResource = require('./permission');

module.exports = class RoleResource extends JsonResource {
  static async getJsonAsync(instance) {
    return {
      id: instance.id,
      name: instance.name,
      created_at: instance.created_at,
      updated_at: instance.updated_at,

      permissions: await PermissionResource.getCollectionAsync(
        await instance.getPermissions()
      )
    };
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      created_at: this.created_at,
      updated_at: this.updated_at,

      permissions: PermissionResource.collection(this.permissions ?? [])
    };
  }
};
