import Projeto from '../models/projeto.js'
import User from '../models/user.js'
import Tag from '../models/tag.js'
import database from '../database/db.js'
import { Op } from 'sequelize'

/* Retornar dados do projeto: título, link, foto, data. Dados do usuário: nome e sobrenome e tags associadas, ordenando por id decrescente (projetos mais recentes aparecem primeiro. Incluir opção de busca via req.query */

const descobrirProjetos = async (req, res) => {
  await database.sync()
  try {
    const busca = req.query.tag

    if (busca) {
      let condicoesTags = {}
      condicoesTags = {
        model: Tag,
        attributes: ['nome'],
        through: { attributes: [] },
        where: {
          nome: Array.isArray(busca) ? busca : [busca],
        },
      }
      const projetos = await Projeto.findAll({
        attributes: ['id', 'titulo', 'link', 'descricao', 'imagem', 'data'],
        include: [
          {
            model: User,
            attributes: ['nome', 'sobrenome'],
          },
          condicoesTags,
        ],
        order: [['id', 'DESC']],
      })
      return res.status(200).json(projetos)
    }
    const projetos = await Projeto.findAll({
      attributes: ['id', 'titulo', 'link', 'descricao', 'imagem', 'data'],
      include: [
        {
          model: User,
          attributes: ['id', 'nome', 'sobrenome', 'avatar'],
        },
        {
          model: Tag,
          attributes: ['id', 'nome'],
          through: { attributes: [] },
        },
      ],
      where: {
        user_id: {
          [Op.ne]: req.user.id,
        },
      },
      order: [['id', 'DESC']],
    })

    return res.status(200).json(projetos)
  } catch (error) {
    console.error('Erro ao buscar projetos:', error)
    return res.status(500).send('Erro no servidor.')
  }
}

export default descobrirProjetos
