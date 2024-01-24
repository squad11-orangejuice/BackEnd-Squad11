import express from 'express'
import dotenv from 'dotenv'
import { userRoutes, portfolioRoutes } from './src/routes/index.js'

dotenv.config()

const app = express()
app.use(express.json())
app.use(userRoutes)
app.use(portfolioRoutes)

const port = process.env.PORT || 3000

app.listen(port)

export default app
