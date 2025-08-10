import prisma from '@/server/prisma'
import { baseProcedure, createTRPCRouter, isAuth } from '@/server/trpc/init'
import { CreateEventSchema } from '@/shared/api/schema'

export const eventRouter = createTRPCRouter({
  findMany: baseProcedure.query(() => {
    return prisma.event.findMany()
  }),
  create: baseProcedure
    .input(CreateEventSchema)
    .use(isAuth)
    .mutation(async ({ input, ctx: { user } }) => {
      return prisma.event.create({
        data: {
          authorId: user.id,
          ...input,
        },
      })
    }),
})
