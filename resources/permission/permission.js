const JsonResource = require('../json-resource');

module.exports = class PermissionResource extends JsonResource {
  static async getJsonAsync(instance) {
    return {
      id: instance.id,
      name: instance.name,
      created_at: instance.created_at,
      updated_at: instance.updated_at
    };
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }
};
