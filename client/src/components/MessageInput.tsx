import { SendIcon } from '@/assets/icon'
import { socket } from '@/socket'
import { Input } from 'antd'
import { useSession } from 'next-auth/react'
import { ChangeEvent, useState } from 'react'

export interface IMessageInput {
  conversationId: string
}

export function MessageInput({ conversationId }: IMessageInput) {
  const { data: session } = useSession({ required: true })
  const currentEmail = session?.user?.email as string

  // Send the message
  const [message, setMessage] = useState('')

  const sendMessage = () => {
    if (message !== '') {
      const __createdtime__ = Date.now()
      const senderUserId = session?.user?.email
      socket.emit('send_message', {
        senderUserId,
        conversationId,
        message,
        __createdtime__,
      })
      setMessage('')
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value)
    socket.emit('typing_message', { conversationId, typingUser: currentEmail })
  }

  return (
    <div className="grid grid-cols-[1fr_40px] items-center px-2">
      <Input
        onChange={handleChange}
        value={message}
        placeholder="Aa"
        onPressEnter={sendMessage}
      />
      <button onClick={sendMessage} className="h-10 w-10">
        <SendIcon />
      </button>
    </div>
  )
}
