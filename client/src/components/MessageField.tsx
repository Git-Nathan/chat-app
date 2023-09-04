import { Api } from '@/api'
import { IMessage } from '@/interface'
import { socket } from '@/socket'
import moment from 'moment'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export interface IMessageField {
  conversationId: string
}

export function MessageField({ conversationId }: IMessageField) {
  const { data: session } = useSession({ required: true })
  const currentEmail = session?.user?.email as string
  const [messagesRecieved, setMessagesReceived] = useState<IMessage[]>([])

  useEffect(() => {
    const getMessages = async () => {
      const { data } = await Api.chat.getMessages(conversationId)
      setMessagesReceived(data)
    }
    getMessages()
  }, [conversationId])

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessagesReceived((state) => [...state, { ...data }])
    })

    return () => {
      socket.off('receive_message')
    }
  }, [])

  return (
    <div className="messages flex h-full flex-col items-center overflow-y-scroll">
      {messagesRecieved.map((item) => {
        const sendTime = moment(item.__createdtime__).calendar()
        return (
          <div
            key={item.messageId}
            className="flex w-full flex-col items-center px-2"
          >
            <div className="my-2 text-sm">{sendTime}</div>
            {currentEmail === item.senderUserId ? (
              <div className="flex w-full justify-end">
                <p className="w-fit rounded-full bg-blue-500 px-4 py-2 text-white">
                  {item.content}
                </p>
              </div>
            ) : (
              <div className="flex w-full items-center">
                <div className="relative h-8 w-8 overflow-hidden rounded-full">
                  <Image alt="avatar" src={item.image} fill sizes="1x" />
                </div>
                <p className="ml-2 w-fit rounded-full bg-gray-200 px-4 py-2">
                  {item.content}
                </p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
