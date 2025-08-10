import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { createContext } from '@/server/trpc/context'
import { appRouter } from '@/server/trpc/routes'

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: createContext,
  })

export { handler as GET, handler as POST }
