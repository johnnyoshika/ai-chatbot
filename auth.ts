import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authConfig } from './auth.config'
import { z } from 'zod'

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({
            message: z.string().min(1),
            hash: z.string().min(1)
          })
          .refine(
            data => {
              try {
                JSON.parse(data.message)
                return true
              } catch {
                return false
              }
            },
            {
              message: 'message must be a valid JSON string'
            }
          )
          .safeParse(credentials)

        if (!parsedCredentials.success) return null

        const { message, hash } = parsedCredentials.data

        const response = await fetch(
          `${process.env.AUTH_SERVER_URL}/v1.0/verify`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message, hash })
          }
        )

        if (!response.ok) return null

        // User data will be JSON serialized and stashed in message
        return JSON.parse(message)
      }
    })
  ]
})
