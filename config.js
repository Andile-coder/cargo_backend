const Sequelize = require("sequelize");
const dotenv = require("dotenv").config();
console.log(process.env.PROD_DATABASE_USER);
const sequelize = new Sequelize(
  `${process.env.PROD_DATABASE_NAME}`,
  `${process.env.PROD_DATABASE_USER}`,
  `${process.env.PROD_DATABASE_PASSWORD}`,
  {
    host: `${process.env.PROD_DATABASE_HOST}`,
    dialect: "mysql",
  }
);

module.exports = sequelize;
