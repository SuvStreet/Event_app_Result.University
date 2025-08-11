import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

export const createContext = async () => {
  const session = await getServerSession(authOptions)

  return {
    user: session?.user,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
