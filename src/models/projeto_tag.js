import { DataTypes } from "sequelize";

import database from "../database/db.js";
import Projeto from "./projeto.js";
import Tag from "./tag.js";

const Projeto_tag = database.define("projeto_tag", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowsNull: false,
    primaryKey: true,
  },
});

Projeto_tag.belongsTo(Projeto, {
  constraint: true,
  foreignKey: "projeto_id",
});

Projeto.hasMany(Projeto_tag, {
  foreignKey: "projeto_id",
});

Projeto_tag.belongsTo(Tag, {
  constraint: true,
  foreignKey: "tag_id",
});

Tag.hasMany(Projeto_tag, {
  foreignKey: "tag_id",
});

export default Projeto_tag;
