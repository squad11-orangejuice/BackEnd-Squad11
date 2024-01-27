import { DataTypes } from 'sequelize'
import sequelize from '../database/db.js'
import Projeto from './projeto.js'
import Tag from './tag.js'

/* Ajuste nas associações conforme a documentação do sequelize: https://sequelize.org/docs/v6/advanced-association-concepts/advanced-many-to-many/ */
const ProjetoTag = sequelize.define('projeto_tag', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowsNull: false,
    primaryKey: true,
  },
})

Projeto.belongsToMany(Tag, { through: ProjetoTag, foreignKey: 'projeto_id' })
Tag.belongsToMany(Projeto, { through: ProjetoTag, foreignKey: 'tag_id' })

export default ProjetoTag
