import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './src/routes/userRoutes.js'
import portfolioRoutes from './src/routes/portfolioRoutes.js'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(express.json())

app.use(userRoutes)
app.use(portfolioRoutes)
const corsConfiguracao = {
  // origin: 'linkprovisorio.com',
  optionsSuccessStatus: 200,
}
app.use(cors(corsConfiguracao))

const port = process.env.PORT || 3000

app.listen(port)

export default app
