import Token from '../models/token.js'
import database from '../database/db.js'
import dotenv from 'dotenv'
dotenv.config()

const logout = async (req, res) => {
  const autorizacao = req.headers.authorization
  const token = autorizacao.split(' ')[1]
  try {
    await Token.update(
      { isValid: false },
      {
        where: { token },
      },
    )
    return res.status(200).send()
  } catch (error) {
    console.error('Erro no controller de logout:', error)
    return res.status(500).send('Erro no servidor.')
  }
}

export default logout
