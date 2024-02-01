import Projeto from '../models/projeto.js'
import User from '../models/user.js'
import Tag from '../models/tag.js'
import database from '../database/db.js'

const verPortfolio = async (req, res) => {
  await database.sync()
  const idUsuario = req.user.id
  try {
    const projetos = await Projeto.findAll({
      attributes: ['id', 'titulo', 'link', 'descricao', 'imagem', 'data'],
      include: [
        {
          model: User,
          attributes: ['id', 'nome', 'sobrenome'],
          where: { id: idUsuario },
        },
        {
          model: Tag,
          attributes: ['id', 'nome'],
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

export default verPortfolio
