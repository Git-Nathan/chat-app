import express from 'express'
import { addNewChat, getMessageById } from '../controllers/chatController.js'
const chatRoutes = express.Router()

chatRoutes.post('/addnew', addNewChat)
chatRoutes.get('/:id', getMessageById)

export default chatRoutes
