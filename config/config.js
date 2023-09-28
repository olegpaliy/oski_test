require("dotenv").config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const URI = `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

const settings = {
  url: URI,
  // dialectOptions: {
  //   ssl: {
  //     require: true,
  //     rejectUnauthorized: false,
  //   },
  // },
};

module.exports = {
  development: { ...settings },
  test: { ...settings },
  production: { ...settings },
};
