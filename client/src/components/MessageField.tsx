import { Api } from '@/api'
import { IMessage } from '@/interface'
import { socket } from '@/socket'
import { Tooltip } from 'antd'
import moment from 'moment'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

export interface IMessageField {
  conversationId: string
}

export function MessageField({ conversationId }: IMessageField) {
  const { data: session } = useSession({ required: true })
  const currentEmail = session?.user?.email as string
  const [messagesRecieved, setMessagesReceived] = useState<IMessage[]>([])
  const messagesRef = useRef<null | HTMLDivElement>(null)
  let prevSender: string | null = null
  console.log('conversationId =>', conversationId)

  //func check time between 2 messages
  const shouldDisplaySendTime = (message1: IMessage, message2: IMessage) => {
    const timeDifference = moment(message2.__createdtime__).diff(
      moment(message1.__createdtime__),
    )
    return timeDifference >= 15 * 60 * 1000 // 15 phút
  }

  // Get messages
  useEffect(() => {
    const getMessages = async () => {
      const { data } = await Api.chat.getMessages(conversationId)
      setMessagesReceived(data)
    }
    getMessages()
  }, [conversationId])

  // Socket
  const [typing, setTyping] = useState(false)
  const typingTimeout = useRef<NodeJS.Timeout | null>()

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessagesReceived((state) => [...state, { ...data }])
      setTyping(false)
    })

    socket.on('typing_message', (data) => {
      if (data.typingUser !== currentEmail) {
        setTyping(true)
      }
      if (typingTimeout.current !== null) {
        clearTimeout(typingTimeout.current)
      }
      typingTimeout.current = setTimeout(() => {
        setTyping(false)
      }, 3000)
    })

    return () => {
      socket.off('receive_message')
      socket.off('typing_message')
    }
  }, [currentEmail])

  // Auto scrolling
  const scrollToBottom = () => {
    messagesRef.current?.scroll({ top: messagesRef.current?.scrollHeight })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messagesRecieved])

  useEffect(() => {
    if (typing) {
      scrollToBottom()
    }
  }, [typing])

  return (
    <div
      ref={messagesRef}
      className="messages flex h-full flex-col items-center overflow-y-scroll px-2"
    >
      <div className="flex w-full flex-col items-center">
        {messagesRecieved.map((item, index) => {
          const sendTime = moment(item.__createdtime__).calendar()

          const isShowSendTime =
            index === 0 ||
            shouldDisplaySendTime(messagesRecieved[index - 1], item)

          const isDifferentSender = prevSender !== item.senderUserId
          prevSender = item.senderUserId

          return (
            <div
              key={item.messageId}
              className="flex w-full flex-col items-center"
            >
              {isDifferentSender && <div className="my-1 w-full" />}

              {isShowSendTime && <div className="my-2 text-sm">{sendTime}</div>}

              {currentEmail === item.senderUserId ? (
                <div
                  className={`${
                    isDifferentSender || isShowSendTime ? '' : ' mt-1'
                  } flex w-full justify-end pl-20`}
                >
                  <Tooltip
                    title={sendTime}
                    placement="left"
                    color="gray"
                    mouseEnterDelay={0.3}
                  >
                    <p className="w-fit break-words break-all rounded-[20px] bg-blue-500 px-4 py-2 text-white">
                      {item.content}
                    </p>
                  </Tooltip>
                </div>
              ) : (
                <div
                  className={`${
                    isDifferentSender || isShowSendTime ? '' : ' mt-1'
                  } flex w-full pr-20`}
                >
                  <div className="relative mt-1 h-8 w-8 overflow-hidden rounded-full">
                    <Image alt="avatar" src={item.image} fill sizes="1x" />
                  </div>

                  <Tooltip
                    title={sendTime}
                    placement="right"
                    color="gray"
                    mouseEnterDelay={0.3}
                  >
                    <p className="ml-2 w-fit break-words break-all rounded-[20px] bg-gray-200 px-4 py-2">
                      {item.content}
                    </p>
                  </Tooltip>
                </div>
              )}
            </div>
          )
        })}

        {typing && <div className="w-full">Đang nhập...</div>}
      </div>
    </div>
  )
}
