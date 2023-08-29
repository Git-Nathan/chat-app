import { IUser } from '@/interface'
import { appFetch } from '.'

export class User {
  signin(user: IUser) {
    return appFetch.post('/users/signin', { user })
  }
}
