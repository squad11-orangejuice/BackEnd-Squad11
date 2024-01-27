import express from 'express'
import middlewareAutenticacao from '../middleware/middlewareAutenticacao.js'
import novoProjeto from '../controllers/novoProjeto.js'

const portfolioRoutes = express()
// Middleware utilizado para todas as rotas
portfolioRoutes.use(middlewareAutenticacao)

portfolioRoutes.get('/home')
portfolioRoutes.post('/projeto/novo', novoProjeto)
// midd verificar se projetos pertencem ao usuário logado
portfolioRoutes.put('/projeto/editar/:id')
portfolioRoutes.delete('/projeto/deletar/:id')
portfolioRoutes.get('/projeto/:id')

export default portfolioRoutes
