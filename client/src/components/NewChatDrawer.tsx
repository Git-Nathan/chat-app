import { Api } from '@/api'
import { BackIcon } from '@/assets/icon'
import { IUser } from '@/interface'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export interface INewChatDrawer {
  handleClose: () => void
}

export function NewChatDrawer({ handleClose }: INewChatDrawer) {
  const { data: session } = useSession({ required: true })
  const currentEmail = session?.user?.email as string
  const router = useRouter()

  // New chat user
  const [userList, setUserList] = useState<IUser[]>([])
  const [loading, setLoading] = useState(true)

  const handleNewChat = async (email: string, targetEmail: string) => {
    const { data } = await Api.chat.newChat(email, targetEmail)
    if (data.conversationId) {
      router.push(`/messages/${data.conversationId}`, { scroll: false })
    }
  }

  useEffect(() => {
    const email = session?.user?.email as string
    if (email) {
      const getData = async () => {
        const { data } = await Api.user.getNewChatUsers(email)
        setUserList(data)
        setLoading(false)
      }
      getData()
    }
  }, [session?.user?.email])

  return (
    <div className="h-full p-6">
      <div className="header flex items-center">
        <button onClick={handleClose} className="h-8 w-8">
          <BackIcon />
        </button>
        <p className="ml-4 text-lg font-bold">New message</p>
      </div>
      <div className="new-chat-list mt-6">
        {loading ? (
          <div>Loading...</div>
        ) : (
          userList.map((item) => (
            <button
              key={item.userId}
              className="mt-6 grid grid-cols-[40px_1fr] first:mt-0"
              onClick={() => {
                handleNewChat(currentEmail, item.email)
              }}
            >
              <Image
                className="rounded-full"
                alt="avatar"
                src={item.image}
                width={40}
                height={40}
              ></Image>
              <div className="flex h-full items-center pl-4">
                <p className="text-base font-bold">{item.name}</p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  )
}
