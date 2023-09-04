import { Api } from '@/api'
import { IUser } from '@/interface'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // authorization: {
      //   params: {
      //     prompt: 'consent',
      //     access_type: 'offline',
      //     response_type: 'code',
      //   },
      // },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const userInfo = { ...user, userId: user.id } as IUser
      const response = await Api.user.signin(userInfo)
      if (response.status == 200) {
        return true
      } else {
        return false
      }
    },
  },
})

export { handler as GET, handler as POST }
