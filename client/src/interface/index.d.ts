export interface IUser {
  userId: string
  name: string
  email: string
  image: string
}

export interface IMessage {
  messageId: string
  senderUserId: string
  name: string
  image: string
  conversationId: string
  content: string
  __createdtime__: number
}
