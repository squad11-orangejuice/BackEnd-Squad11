import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './src/routes/userRoutes.js'
import portfolioRoutes from './src/routes/portfolioRoutes.js'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())
app.use(userRoutes)
app.use(portfolioRoutes)

const port = process.env.PORT || 3000

app.listen(port)

export default app
