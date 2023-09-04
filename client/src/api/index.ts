import { Chat } from './Chat'
import { User } from './User'
import { Fetch } from './config/Fetch'

export const appFetch = new Fetch('http://localhost:4000', {
  headers: {
    'Content-Type': 'application/json',
  },
})

// export const appFetch = new Fetch('http://192.168.81.107:4000', {
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })

const user = new User()
const chat = new Chat()

export const Api = { user, chat }
