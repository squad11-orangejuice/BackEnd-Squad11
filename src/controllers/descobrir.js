import Projeto from '../models/projeto.js'
import User from '../models/user.js'
import dotenv from 'dotenv'
import ProjetoTag from '../models/projeto_tag.js'
import Tag from '../models/tag.js'
import database from '../database/db.js'

/* Retornar dados do projeto: título, link, foto, data. Dados do usuário: nome e sobrenome e tags associadas, ordenando por id decrescente (projetos mais recentes aparecem primeiro) */
const descobrirProjetos = async (req, res) => {
  await database.sync()
  try {
    const projetos = await Projeto.findAll({
      attributes: ['titulo', 'link', 'descricao', 'imagem', 'data'],
      include: [
        {
          model: User,
          attributes: ['nome', 'sobrenome'],
        },
        {
          model: Tag,
          attributes: ['nome'],
          through: { attributes: [] },
        },
      ],
      order: [['id', 'DESC']],
    })

    return res.status(200).json(projetos)
  } catch (error) {
    console.error('Erro ao buscar projetos:', error)
    return res.status(500).send('Erro no servidor.')
  }
}

export default descobrirProjetos
