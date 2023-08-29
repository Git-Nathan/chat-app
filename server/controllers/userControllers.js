import { Api } from '../api/index.js'

export const signin = async (req, res) => {
  const { id, name, email, image } = req.body.user

  try {
    const checkExisted = await Api.post('/', {
      operation: 'sql',
      sql: `SELECT * FROM realtime_chat_app.users WHERE email = '${email}'`,
    })
    if (checkExisted.data.length > 0) {
      res.status(200).json({ message: 'Signin successfully' })
    } else {
      const response = await Api.post('/', {
        operation: 'sql',
        sql: `INSERT INTO realtime_chat_app.users (id, name, email, image) VALUE (${id}, '${name}', '${email}', '${image}')`,
      })
      if (response.status === 200) {
        res.status(200).json({ message: 'Signin successfully' })
      } else {
        res.status(500).json({ message: 'Insert failed' })
      }
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}
