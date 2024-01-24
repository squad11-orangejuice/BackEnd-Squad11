import express from 'express'
import dotenv from 'dotenv'
import { userRoutes, portfolioRoutes } from './src/routes/index.js'
import database from './src/database/db.js'

dotenv.config()

const app = express()
app.use(express.json())
try {
  await database.sync({ force: false })
} catch (error) {
  console.error('Erro ao sincronizar com o banco de dados.')
}

app.use(userRoutes)
app.use(portfolioRoutes)

const port = process.env.PORT || 3000

app.listen(port)

export default app
