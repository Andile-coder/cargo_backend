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
  status: {
    type: DataTypes.STRING,
    defaultValue: "FREE",
  },
  icetime: {
    type: DataTypes.STRING,
  },
  temp: {
    type: DataTypes.STRING,
  },
});
// async () => await sequelize.sync({ force: true });
const create = async () =>
  await sequelize.sync({ force: true }).then(console.log("Database"));

create();

module.exports = Container;
