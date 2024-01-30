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
    allowsNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowsNull: false,
  },
  imagem: {
    type: DataTypes.STRING,
    allowsNull: false,
  },
  data: {
    type: DataTypes.DATE,
    allowsNull: false,
  },
})

export default Projeto
