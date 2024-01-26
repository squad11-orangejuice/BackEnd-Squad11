import express from 'express'
import loginSocial from '../controllers/loginSocial.js'
import userLogin from '../controllers/loginController.js'
import create from '../controllers/RegisterController.js'
const userRoutes = express()

userRoutes.post('/usuario/cadastrar', create)
userRoutes.post('/usuario/login', userLogin)
userRoutes.post('usuario/login/google', loginSocial)
userRoutes.post('/usuario/logout')

// midd autenticação a partir daqui
// home recebe params p/ buscar tags
userRoutes.get('/descobrir')

export default userRoutes
