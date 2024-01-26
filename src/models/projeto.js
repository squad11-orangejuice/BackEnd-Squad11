import { DataTypes } from 'sequelize'

import { define } from '../database/db'
import User, { hasMany } from './user'

const Projeto = define('projeto', {
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
  },
  data: {
    type: DataTypes.DATE,
    allowsNull: false,
  },
})

Projeto.belongsTo(User, {
  constraint: true,
  foreignKey: 'user_id',
})

hasMany(Projeto, {
  foreignKey: 'user_id',
})

export default Projeto
