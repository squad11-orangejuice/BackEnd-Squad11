import express from 'express'

const portfolioRoutes = express()

portfolioRoutes.get('/home')
portfolioRoutes.post('/projeto/novo')
// midd verificar se projetos pertencem ao usuário logado
portfolioRoutes.put('/projeto/editar/:id')
portfolioRoutes.delete('/projeto/deletar/:id')
portfolioRoutes.get('/projeto/:id')

export default portfolioRoutes
