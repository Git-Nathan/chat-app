'use client'

import { NewChat } from '@/assets/icon'
import { useSession } from 'next-auth/react'

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
  const { data: session, status } = useSession({ required: true })

  return (
    <div className="fixed left-0 top-0 flex h-full w-full flex-col bg-[#F8F8F8] p-6">
      <div className="header flex w-full justify-between">
        <h1 className="text-[32px] font-bold">Chats</h1>
        <div className="flex items-center">
          <button className="h-[37px] w-[37px]">
            <NewChat />
          </button>
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
              <div className="overflow-hidden truncate text-xs text-[#696969]">
                asdfasdf asdfadsf asdf sasdf
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
