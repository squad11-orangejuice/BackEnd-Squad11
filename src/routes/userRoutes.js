import express from 'express'
const userRoutes = express()

userRoutes.post('/cadastrar')
userRoutes.post('login')

// midd autenticação a partir daqui
// home recebe params p/ buscar tags
userRoutes.get('/home')

export default userRoutes
