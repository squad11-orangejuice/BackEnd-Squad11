import express from 'express'
import loginSocial from '../controllers/loginSocial.js'
import userLogin from '../controllers/loginController.js'
import UserController from '../controllers/UserController.js'
const userRoutes = express()

userRoutes.post('/cadastrar', async (req, res) => {
  await UserController.create(req, res)
})
userRoutes.post('/login', userLogin)
userRoutes.post('/login/social', loginSocial)
userRoutes.post('/login/out')

// midd autenticação a partir daqui
// home recebe params p/ buscar tags
userRoutes.get('/home')

export default userRoutes
