'use client'

import { Api } from '@/api'
import { BackIcon } from '@/assets/icon'
import { MessageField } from '@/components/MessageField'
import { MessageInput } from '@/components/MessageInput'
import { IUser } from '@/interface'
import { socket } from '@/socket'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useLayoutEffect, useState } from 'react'

export default function MessagesPage({ params }: { params: { id: string } }) {
  const conversationId = params.id
  const router = useRouter()

  // Get conversation users
  const [conversationUsers, setConversationUsers] = useState<IUser[]>([])
  const { data: session } = useSession({ required: true })
  const currentEmail = session?.user?.email as string

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await Api.chat.getTheRestUsers(
        currentEmail,
        conversationId,
      )
      setConversationUsers(data)
    }
    getUsers()
  }, [conversationId, currentEmail])

  useLayoutEffect(() => {
    socket.emit('join_room', {
      conversationId,
    })
  }, [conversationId])

  const RenderHeader = () => {
    if (conversationUsers.length === 0) return

    return (
      <div className="ml-4 flex items-center">
        <div className="min-w-10 relative h-10 w-10 overflow-hidden rounded-full">
          <Image
            alt="avatar"
            src={conversationUsers[0].image}
            fill
            sizes="1x"
          ></Image>
        </div>
        <p className="ml-4 min-w-0 text-base font-semibold">
          {conversationUsers[0].name}
        </p>
      </div>
    )
  }

  return (
    <div className="fixed grid h-full w-full grid-rows-[64px_1fr_50px]">
      <div className="header flex items-center px-2">
        <button
          onClick={() => {
            router.back()
          }}
          className="min-w-8 h-8 w-8"
        >
          <BackIcon />
        </button>
        <RenderHeader />
      </div>
      <MessageField conversationId={conversationId} />
      <MessageInput conversationId={conversationId} />
    </div>
  )
}
