const JsonResource = require('../json-resource');

module.exports = class PermissionResource extends JsonResource {
  static async getJsonAsync(instance) {
    return {
      id: instance.id,
      name: instance.name
    };
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name
    };
  }
};
