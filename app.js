import express from 'express'
import dotenv from 'dotenv'
import { userRoutes, portfolioRoutes } from './src/routes/index'

dotenv.config()

const app = express()
app.use(express.json())
app.use(userRoutes)
app.user(portfolioRoutes)

const port = process.env.PORT || 3000

app.listen(port)

module.exports = app
