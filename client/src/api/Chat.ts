import { appFetch } from '.'

export class Chat {
  newChat(email: string, targetEmail: string) {
    return appFetch.post('/chat/addnew', { email, targetEmail })
  }

  getTheRestUsers(currentEmail: string, conversationId: string) {
    return appFetch.post(`/chat/therest`, { currentEmail, conversationId })
  }

  getMessages(conversationId: string) {
    return appFetch.get(`/chat/${conversationId}`)
  }
}
