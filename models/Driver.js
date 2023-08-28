const sequelize = require("../config.js");

const { DataTypes } = require("sequelize");

const Driver = sequelize.define("Driver", {
  driver_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  licence_number: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
  },
  score: {
    type: DataTypes.INTEGER,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  cell_phone_number: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  profile_pic_url: {
    type: DataTypes.STRING(100),
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false,
  },
  varified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

module.exports = Driver;
