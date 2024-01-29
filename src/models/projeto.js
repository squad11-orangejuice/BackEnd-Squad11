
import { DataTypes } from 'sequelize'
import sequelize from '../database/db.js'

const Projeto = await sequelize.define('projeto', {

  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowsNull: false,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowsNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowsNull: true,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowsNull: true,
  },
  imagem: {
    type: DataTypes.STRING,
    allowsNull: true,
  },
  data: {
    type: DataTypes.DATE,
    allowsNull: true,
  },
});

export default Projeto

