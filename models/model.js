const { Model } = require('sequelize');
const slugify = require('slugify');

const { APP_URL } = require('../config/app');

module.exports = class BaseModel extends Model {
  _hidden = [];

  static associate() {}

  static async findAndPaginateAll(
    queryset = {},
    page = 1,
    perPage = null,
    linkBaseUrl = `${APP_URL}/${slugify(this.name, { lower: true })}s`
  ) {
    const offset = (page - 1) * perPage;

    queryset.offset = offset;

    if (perPage) {
      queryset.limit = perPage;
    }

    const { count: total, rows: data } = await this.findAndCountAll(queryset);

    const lastPage =
      total % (perPage ?? total) === 0
        ? total / (perPage ?? total)
        : Math.floor(total / (perPage ?? total)) + 1;

    const first = `${linkBaseUrl}?page=1${
      perPage ? `&per_page=${perPage}` : ''
    }`;

    const last = `${linkBaseUrl}?page=${lastPage}${
      perPage ? `&per_page=${perPage}` : ''
    }`;

    const prev =
      page > 1
        ? `${linkBaseUrl}?page=${page - 1}${
            perPage ? `&per_page=${perPage}` : ''
          }`
        : null;

    const next =
      page < lastPage
        ? `${linkBaseUrl}?page=${page + 1}${
            perPage ? `&per_page=${perPage}` : ''
          }`
        : null;

    perPage = perPage ?? total;

    const count = data.length;
    const from = count ? offset + 1 : null;
    let to = offset + perPage;

    to = to < total ? to : total;
    to = count ? to : null;

    return {
      data,
      links: {
        first,
        last,
        prev,
        next
      },
      meta: {
        current_page: page,
        per_page: perPage,
        from,
        to,
        count,
        total,
        last_page: lastPage
      }
    };
  }

  toJSON() {
    const dataValues = { ...this.dataValues };

    Object.keys(dataValues).forEach((attribute) => {
      if (this._hidden.includes(attribute)) {
        delete dataValues[attribute];
      }
    });

    return dataValues;
  }
};
