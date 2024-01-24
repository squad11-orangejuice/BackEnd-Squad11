import database from '../database/db.js'
import User from '../models/user.js'

const UserController = {
  create: async (req, res) => {
    await database.sync()

    const user = User.create({
      nome: req.body.nome,
      sobrenome: req.body.sobrenome,
      email: req.body.email,
      password: req.body.password,
    })
    console.log(user)
    res.send('criado!')
  },
}

export default UserController
