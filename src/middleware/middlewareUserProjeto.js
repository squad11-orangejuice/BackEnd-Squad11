import database from '../database/db.js'
import User from '../models/user.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Projeto from '../models/projeto.js'

dotenv.config()

const middlewareUserProjeto = async (req, res, next) => {
  const user_id = req.user.id
  const { id } = req.params
  try {
    const projeto = await Projeto.findOne({
      where: {
        id,
      },
    })

    if (user_id != projeto.user_id) {
      return res.status(401).send('Usuário não autorizado.')
    }

    next()
  } catch (error) {
    console.error('Erro ao procurar projeto: ', error)
    return res.status(500).send('Erro no servidor.')
  }
}

export default middlewareUserProjeto
