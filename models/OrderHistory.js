const sequelize = require("../config.js");

const { DataTypes } = require("sequelize");
const Order = require("./Order.js");
const OrderHistory = sequelize.define("order_history", {
  Order_history_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },

  order_number: {
    type: DataTypes.STRING(50),
    references: {
      model: Order,
      key: "order_number",
    },
  },
  status: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});
const create = async () =>
  await sequelize.sync({ force: true }).then(console.log("Database"));

create();
module.exports = OrderHistory;
