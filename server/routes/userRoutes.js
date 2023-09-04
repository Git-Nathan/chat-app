import express from 'express'
import { getNewChatUsers, signin } from '../controllers/userControllers.js'
const userRoutes = express.Router()

userRoutes.post('/signin', signin)

userRoutes.post('/newchat', getNewChatUsers)

export default userRoutes
