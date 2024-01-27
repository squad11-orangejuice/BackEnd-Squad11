import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Token from '../models/token.js'
import database from '../database/db.js'
import dotenv from 'dotenv'
dotenv.config()

/* controller login: recebe no body email e senha, busca usuario no db, compara senha com bcrypt. Se não existe o usuário, mensagem genérica de usuário ou senha inválidos. Se existe usuário, gerar token. Desestruturação da variável user para excluir a senha e retornar os demais dados do usuário logado junto com o token. O token é enviado para a tabela de tokens como válido. */

const userLogin = async (req, res) => {
  await database.sync({ force: false })
  const { email, password } = req.body
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    })
    if (!user) {
      return res.status(404).json({ mensagem: 'Usuário não encontrado.' })
    }

    const senhaValida = await bcrypt.compare(password, user.password)
    if (!senhaValida) {
      return res.status(401).json({ mensagem: 'Usuári ou senha inválidos' })
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_PASSWORD, {
      expiresIn: process.env.JWT_EXPIRE,
    })

    await Token.create({
      token,
      isValid: true,
      user_id: user.id,
    })

    const { password: _, google_id: __, ...userLogado } = user
    return res.status(200).json({ token })
  } catch (error) {
    console.error(error, 'Erro no controller de login')
    res.status(500).json({ mensagem: 'Erro intero do servidor.' })
  }
}

export default userLogin
