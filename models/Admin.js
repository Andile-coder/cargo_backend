const { DataTypes } = require("sequelize");

const sequelize = require("../config");

const Admin = sequelize.define("Admin", {
  user_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(50),
  },
  organisation: {
    type: DataTypes.STRING(100),
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
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

module.exports = Admin;
