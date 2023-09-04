import { IUser } from '@/interface'
import { appFetch } from '.'

export class User {
  signin(user: IUser) {
    return appFetch.postRes('/users/signin', { user })
  }
  getNewChatUsers(email: string) {
    return appFetch.post(`/users/newchat`, { email })
  }
}
