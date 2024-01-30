import express from 'express'
import loginSocial from '../controllers/loginSocial.js'
import userLogin from '../controllers/loginController.js'
import create from '../controllers/RegisterController.js'
import logout from '../controllers/logout.js'
import descobrirProjetos from '../controllers/descobrir.js'
import middlewareAutenticacao from '../middleware/middlewareAutenticacao.js'
const userRoutes = express()

userRoutes.post('/usuario/login/google', loginSocial)
userRoutes.post('/usuario/cadastrar', create)
userRoutes.post('/usuario/login', userLogin)

userRoutes.post('/usuario/logout', middlewareAutenticacao, logout)
userRoutes.get('/descobrir', middlewareAutenticacao, descobrirProjetos)

export default userRoutes
