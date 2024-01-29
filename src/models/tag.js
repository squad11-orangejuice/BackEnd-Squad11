import { DataTypes } from "sequelize";

import database from "../database/db.js";

const Tag = database.define("tag", {
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
});

export default Tag;
