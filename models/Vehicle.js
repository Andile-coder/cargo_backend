const sequelize = require("../config.js");

const { DataTypes } = require("sequelize");
const Driver = require("./Driver.js");
const Vehicle = sequelize.define("Vehicle", {
  vehicle_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  driver_id: {
    type: DataTypes.UUID,
    references: {
      model: Driver,
      key: "driver_id",
    },
  },
  model: {
    type: DataTypes.STRING(50),
  },
  registration_number: {
    type: DataTypes.STRING(100),

    allowNull: false,
  },
});
// async () => await sequelize.sync({ force: true });

module.exports = Vehicle;
