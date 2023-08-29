import express from 'express'
import { signin } from '../controllers/userControllers.js'
const userRoutes = express.Router()

userRoutes.post('/signin', signin)

export default userRoutes
