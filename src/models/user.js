import { DataTypes } from 'sequelize'
import sequelize from '../database/db.js'
import Projeto from './projeto.js'

const User = await sequelize.define('user', {
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
  avatar: {
    type: DataTypes.TEXT,
    unique: true,
    allowsNull: true,
  },
})

User.hasMany(Projeto, { foreignKey: 'user_id' })
Projeto.belongsTo(User, {
  constraint: true,
  foreignKey: 'user_id',
})
export default User
