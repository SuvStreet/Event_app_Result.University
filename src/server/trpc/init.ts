import { initTRPC, TRPCError } from '@trpc/server'
import SuperJSON from 'superjson'
import { Context } from './context'

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
})

export const createTRPCRouter = t.router
export const baseProcedure = t.procedure

export const isAuth = t.middleware(async (opts) => {
  const { ctx } = opts

  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return opts.next({
    ctx: {
      user: ctx.user,
    },
  })
})
