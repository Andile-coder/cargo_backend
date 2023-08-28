const sequelize = require("../config.js");
const { DataTypes } = require("sequelize");
const User = require("./User.js");
const Driver = require("./Driver.js");
const Order = sequelize.define("Order", {
  order_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
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
  order_number: {
    type: DataTypes.STRING(50),
  },
  parcel_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  required_temp: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  priority_status: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  pickup_address: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  droppoff_address: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  pickup_date: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
async () => await sequelize.sync({ force: true });

module.exports = Order;
