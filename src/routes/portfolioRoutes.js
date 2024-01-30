import express from 'express'
import deleteProjeto from '../controllers/deleteProjetoController.js'
import middlewareAutenticacao from '../middleware/middlewareAutenticacao.js'
import middlewareUserProjeto from '../middleware/middlewareUserProjeto.js'
import editarProjeto from '../controllers/editarProjeto.js'

const portfolioRoutes = express()

portfolioRoutes.use(middlewareAutenticacao)

portfolioRoutes.get('/portfolio')
portfolioRoutes.post('/projeto/novo')
// midd verificar se projetos pertencem ao usuário logado
portfolioRoutes.use('/projeto/:id', middlewareUserProjeto)

portfolioRoutes.put('/projeto/:id', editarProjeto)
portfolioRoutes.delete('/projeto/:id', deleteProjeto)
portfolioRoutes.get('/projeto/:id')

export default portfolioRoutes
