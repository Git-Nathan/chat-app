'use client'

import { NewChatButton } from '@/components/NewChatButton'
import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

const listUser = [
  {
    id: 1,
    name: '<NAME>',
  },
  {
    id: 2,
    name: '<NAME>',
  },
  {
    id: 3,
    name: '<NAME>',
  },
]

export default function Home() {
  const { data: session } = useSession({ required: true })

  const avatar = session?.user?.image as string

  const handleSignout = () => {
    signOut()
  }

  return (
    <div className="fixed left-0 top-0 flex h-full w-full flex-col bg-[#F8F8F8] p-6">
      <div className="header flex w-full justify-between">
        <h1 className="text-[32px] font-bold">Chats</h1>
        <div className="flex items-center">
          <NewChatButton />
          {avatar ? (
            <button
              onClick={handleSignout}
              className="h-[37px] w-[37px] overflow-hidden rounded-full"
            >
              <Image alt="avatar" src={avatar} width={40} height={40}></Image>
            </button>
          ) : (
            <div className="h-[37px] w-[37px] overflow-hidden rounded-full bg-slate-300"></div>
          )}
        </div>
      </div>
      <div className="chat-list mt-[50px]">
        {listUser.map((item) => (
          <div
            key={item.id}
            className="chat-item mt-7 grid h-[75px] w-full grid-cols-[75px_1fr] rounded-full first:mt-0"
          >
            <div className="h-[75px] w-[75px] rounded-full bg-blue-400"></div>
            <div className="flex h-full min-w-0 flex-col justify-center pl-[15px]">
              <div className="truncate text-base font-bold">
                adsfasdf asdfsdaf asdfadsf asdfasfd asfd
              </div>
              <div className="mt-[6px] overflow-hidden truncate text-xs text-[#696969]">
                asdfasdf asdfadsf asdf sasdf
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
