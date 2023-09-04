import bodyParser from 'body-parser'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { Api } from './api/index.js'
import chatRoutes from './routes/chatRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express()

const httpServer = createServer(app)

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

app.use('/users', userRoutes)
app.use('/chat', chatRoutes)

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  socket.on('join_room', (data) => {
    const { conversationId } = data
    socket.join(conversationId)
  })

  socket.on('send_message', async (data) => {
    const { senderUserId, conversationId, message, __createdtime__ } = data

    try {
      // Save message to database
      const insertRes = await Api.post('/', {
        operation: 'sql',
        sql: `INSERT INTO realtime_chat_app.messages (content, conversationId, senderUserId, __createdtime__) VALUE ('${message}', '${conversationId}', '${senderUserId}', '${__createdtime__}')`,
      })
      const insertedId = insertRes.data.inserted_hashes[0]
      const newMessage = await Api.post('/', {
        operation: 'sql',
        sql: `SELECT *
              FROM realtime_chat_app.messages AS t1
              LEFT JOIN realtime_chat_app.users AS t2
              ON t1.senderUserId = t2.email
              WHERE messageId = '${insertedId}'
              ORDER BY t1.__createdtime__ ASC`,
      })
      // Send the message to all users in the conversation
      io.in(conversationId).emit('receive_message', {
        ...newMessage.data[0],
      })
    } catch (error) {
      console.log(error)
    }
  })
})

httpServer.listen(4000, () => {
  console.log('Server running on port 4000')
})
