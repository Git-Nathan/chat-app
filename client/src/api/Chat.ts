import { appFetch } from '.'

export class Chat {
  newChat(email: string, targetEmail: string) {
    return appFetch.post('/chat/addnew', { email, targetEmail })
  }

  getMessages(conversationId: string) {
    return appFetch.get(`/chat/${conversationId}`)
  }
}
