import express from 'express'
import { UserController, userLogin, loginSocial } from '../controllers/index.js'
const userRoutes = express()

userRoutes.post('/cadastrar', async (req, res) => {
  await UserController.create(req, res)
})
userRoutes.post('/login', userLogin)
userRoutes.post('/login/social', loginSocial)

// midd autenticação a partir daqui
// home recebe params p/ buscar tags
userRoutes.get('/home')

export default userRoutes
