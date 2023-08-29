import { User } from './User'
import { Fetch } from './config/Fetch'

export const appFetch = new Fetch('http://localhost:4000', {
  headers: {
    'Content-Type': 'application/json',
  },
})

const user = new User()

export const Api = { user }
