import { DataTypes } from "sequelize";

import database from "../database/db.js";

const User = await database.define("user", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowsNull: false,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowsNull: false,
  },
  sobrenome: {
    type: DataTypes.STRING,
    allowsNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowsNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowsNull: true,
  },
  google_id: {
    type: DataTypes.STRING,
    unique: true,
    allowsNull: true,
  },
});

export default User;
