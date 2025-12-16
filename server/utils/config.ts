import { PrismaClient } from '@prisma/client'
import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'

export const prisma = new PrismaClient()

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  baseURL: getBaseUrl(),
  emailAndPassword: { enabled: true },
  user: {
    additionalFields: {
      firstname: { type: 'string' },
      lastname: { type: 'string' }
    },
    deleteUser: { enabled: true }
  }
})

function getBaseUrl() {
  let baseUrl = process.env.BETTER_AUTH_URL

  if (!baseUrl) {
    baseUrl = getRequestURL(useEvent()).origin
  }

  return baseUrl
}
