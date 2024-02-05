import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Token from '../models/token.js'
import database from '../database/db.js'
import dotenv from 'dotenv'
dotenv.config()

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
      return res.status(401).json({ mensagem: 'Usuário ou senha inválidos' })
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_PASSWORD)

    await Token.create({
      token,
      isValid: true,
      user_id: user.id,
    })

    const { nome, sobrenome, avatar } = user
    return res.status(200).json({ nome, sobrenome, avatar, token })
  } catch (error) {
    console.error('Erro no controle de login:', error)
    res.status(500).json({ mensagem: 'Erro no servidor.' })
  }
}

export default userLogin
