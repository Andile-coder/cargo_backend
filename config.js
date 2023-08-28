const Sequelize = require("sequelize");
const sequelize = new Sequelize("cargo", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize;
