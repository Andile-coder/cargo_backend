const sequelize = require("../config.js");

const { DataTypes } = require("sequelize");
const Vehicle = require("./Vehicle.js");
const Container = sequelize.define("Container", {
  Container_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  vehicle_id: {
    type: DataTypes.UUID,
    references: {
      model: Vehicle,
      key: "vehicle_id",
    },
  },
  model: {
    type: DataTypes.STRING(50),
  },
  mac_address: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING(100),
  },
});
// async () => await sequelize.sync({ force: true });

module.exports = Container;
