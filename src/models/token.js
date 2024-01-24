const { DataTypes } = require("sequelize");

const database = require("../database/db");
const User = require("./user");

const Token = database.define("token", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowsNull: false,
    primaryKey: true,
  },
  token: {
    type: DataTypes.STRING,
    allowsNull: false,
    unique: true,
  },
  isValid: {
    type: DataTypes.BOOLEAN,
    allowsNull: false,
    default: true,
  },
});

Token.belongsTo(User, {
  constraint: true,
  foreignKey: "user_id",
});

User.hasMany(Token, {
  foreignKey: "user_id",
});

module.exports = User;
