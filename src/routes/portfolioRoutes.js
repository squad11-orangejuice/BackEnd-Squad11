import express from 'express'
import middlewareAutenticacao from '../middleware/middlewareAutenticacao.js'

const portfolioRoutes = express()
// Middleware utilizado para todas as rotas
portfolioRoutes.use(middlewareAutenticacao)

portfolioRoutes.get('/home')
portfolioRoutes.post('/projeto/novo')
// midd verificar se projetos pertencem ao usuário logado
portfolioRoutes.put('/projeto/editar/:id')
portfolioRoutes.delete('/projeto/deletar/:id')
portfolioRoutes.get('/projeto/:id')

export default portfolioRoutes
