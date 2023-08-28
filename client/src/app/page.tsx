'use client'

import { signOut, useSession } from 'next-auth/react'

export default function Home() {
  const { data: session, status } = useSession({ required: true })

  return (
    <div>
      <p>{session?.user?.email}</p>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  )
}
