import Projeto from '../models/projeto.js'
import User from '../models/user.js'
import Tag from '../models/tag.js'
import database from '../database/db.js'

const verProjeto = async (req, res) => {
  await database.sync()
  const { id } = req.params
  try {
    const projeto = await Projeto.findByPk(id, {
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
    })
    console.log(projeto)
    return res.status(200).json(projeto)
  } catch (error) {
    console.error('Erro ao buscar projetos:', error)
    return res.status(500).send('Erro no servidor.')
  }
}

export default verProjeto
