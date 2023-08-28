const sequelize = require("../config.js");
const { DataTypes } = require("sequelize");
const User = require("./User.js");
const Driver = require("./Driver.js");

const InvalidToken = sequelize.define("InvalidToken", {
  token_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  token: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,
    references: {
      model: User,
      key: "user_id",
    },
  },
  driver_id: {
    type: DataTypes.UUID,
    references: {
      model: Driver,
      key: "driver_id",
    },
  },
});

// const create = async () =>
//   await sequelize.sync({ force: true }).then(console.log("Database"));

// create();

module.exports = InvalidToken;
