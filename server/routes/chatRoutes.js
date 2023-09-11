import express from 'express'
import {
  addNewChat,
  getMessageById,
  getTheRestUsers,
} from '../controllers/chatController.js'
const chatRoutes = express.Router()

chatRoutes.post('/addnew', addNewChat)
chatRoutes.get('/:id', getMessageById)
chatRoutes.post('/therest', getTheRestUsers)

export default chatRoutes
