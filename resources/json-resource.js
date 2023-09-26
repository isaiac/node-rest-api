/* eslint no-constructor-return: 'off' */
module.exports = class JsonResource {
  constructor(instance) {
    instance.toJSON = this.toJSON;

    return instance;
  }

  static collection(instances) {
    return instances.map((instance) => new this(instance));
  }

  static pagination(pag) {
    return {
      data: pag.data.map((instance) => new this(instance)),
      links: pag.links,
      meta: pag.meta
    };
  }

  static async getJsonAsync(instance) {
    return instance.toJSON();
  }

  static async getCollectionAsync(instances) {
    return Promise.all(
      instances.map(async (instance) => this.getJsonAsync(instance))
    );
  }

  static async getPaginationAsync(pag) {
    return {
      data: await Promise.all(
        pag.data.map(async (instance) => this.getJsonAsync(instance))
      ),
      links: pag.links,
      meta: pag.meta
    };
  }

  toJSON() {
    return this.dataValues;
  }
};
