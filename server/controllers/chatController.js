import { Api } from '../api/index.js'

export const addNewChat = async (req, res) => {
  const { email, targetEmail } = req.body

  try {
    const checkExisted = await Api.post('/', {
      operation: 'sql',
      sql: `SELECT DISTINCT C1.conversationId
            FROM realtime_chat_app.conversationUser AS C1
            JOIN realtime_chat_app.conversationUser AS C2 ON C1.conversationId = C2.conversationId
            WHERE C1.usersEmail = '${email}' AND C2.usersEmail = '${targetEmail}';`,
    })
    if (checkExisted.data.length > 0) {
      res
        .status(200)
        .json({ data: { conversationId: checkExisted.data[0].conversationId } })
    } else {
      // Create new conversation
      const newConversation = await Api.post('/', {
        operation: 'sql',
        sql: `INSERT INTO realtime_chat_app.conversation (createdByUserId) VALUE ('${email}')`,
      })
      const conversationId = newConversation.data.inserted_hashes[0]

      // Add members to conversation
      Api.post('/', {
        operation: 'sql',
        sql: `INSERT INTO realtime_chat_app.conversationUser (conversationId, usersEmail) VALUE ('${conversationId}', '${email}')`,
      })
      Api.post('/', {
        operation: 'sql',
        sql: `INSERT INTO realtime_chat_app.conversationUser (conversationId, usersEmail) VALUE ('${conversationId}', '${targetEmail}')`,
      })
      res.status(200).json({ data: { conversationId } })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

export const getMessageById = async (req, res) => {
  const { id } = req.params

  try {
    const { data } = await Api.post('/', {
      operation: 'sql',
      sql: `SELECT *
            FROM realtime_chat_app.messages AS t1
            LEFT JOIN realtime_chat_app.users AS t2
            ON t1.senderUserId = t2.email
            WHERE conversationId = '${id}'
            ORDER BY t1.__createdtime__ ASC`,
    })
    res.status(200).json({ data })
  } catch (error) {
    res.status(500).json({ error })
  }
}
