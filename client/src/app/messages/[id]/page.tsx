'use client'

import { BackIcon } from '@/assets/icon'
import { MessageField } from '@/components/MessageField'
import { MessageInput } from '@/components/MessageInput'
import { socket } from '@/socket'
import { useRouter } from 'next/navigation'
import { useLayoutEffect } from 'react'

export default function MessagesPage({ params }: { params: { id: string } }) {
  const conversationId = params.id
  const router = useRouter()

  useLayoutEffect(() => {
    socket.emit('join_room', {
      conversationId,
    })
  }, [conversationId])

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
        <div className="ml-4 flex items-center">
          <div className="min-w-10 h-10 w-10 bg-blue-300"></div>
          <p className="ml-4 min-w-0 text-base font-semibold">Ai dos</p>
        </div>
      </div>
      <MessageField conversationId={conversationId} />
      <MessageInput conversationId={conversationId} />
    </div>
  )
}
