import { db } from '@/lib/db'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { nanoid } from 'nanoid'
import { NextAuthOptions, getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
 secret:"dhakjhkajdhkaj",
  providers: [
    GoogleProvider({
      clientId: process.env.NEXTAUTH_CLIENT_ID!,
      clientSecret: process.env.NEXTAUTH_CLIENT_SECRET!,
      authorization: 'https://accounts.google.com/o/oauth2/v2/auth',
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id
        session.user.name = token.name
        session.user.email = token.email
        session.user.image = token.picture
        session.user.username = token.username
      }
      return session
    },

    async jwt({ token, user }) {
      if (user) {
        const dbUser = await db.user.findFirst({
          where: { email: user.email },
        })

        if (!dbUser) {
          token.id = user.id
          token.email = user.email
          token.name = user.name
          token.picture = user.image
          return token
        }

        if (!dbUser.username) {
          await db.user.update({
            where: { id: dbUser.id },
            data: { username: nanoid(10) },
          })
        }

        return {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          picture: dbUser.image,
          username: dbUser.username,
        }
      }
      return token
    },

    redirect() {

      return '/'
    },
  },
  
}

export const getAuthSession = () => getServerSession(authOptions)
