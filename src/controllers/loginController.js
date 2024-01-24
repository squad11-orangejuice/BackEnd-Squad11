import database from '../database/db.js'
import User from '../models/user.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

/* controller login: recebe no body email e senha, busca usuario no db, compara senha com bcrypt. Se não existe o usuário, mensagem genérica de usuário ou senha inválidos. Se existe usuário, gerar token. Desestruturação da variável user para excluir a senha e retornar os demais dados do usuário logado junto com o token. */

const userLogin = {
  login: async (req, res) => {
    await database.sync()
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
        return res.status().json({ mensagem: 'Usuári ou senha inválidos' })
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_PASSWORD, {
        expiresIn: process.env.JWT_EXPIRE,
      })
      const { password: _, ...userLogado } = user
      return res.status(200).json({ userLogado, token })
    } catch (error) {
      console.error(error)
      res.status(500)
    }
  },
}

export default userLogin
