import Token from '../models/token.js'
import database from '../database/db.js'
import dotenv from 'dotenv'
dotenv.config()
/* Recebe o token via header, utiliza o método split para separar o token e altera o estado isValid para false */

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
    return res.status(500).send('Erro interno do servidor.')
  }
}

export default logout
