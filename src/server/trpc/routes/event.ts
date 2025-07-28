import prisma from '@/server/prisma'
import { baseProcedure, createTRPCRouter } from '@/server/trpc/init'
import { CreateEventSchema } from '@/shared/lib/react-query/api/shema'

export const eventRouter = createTRPCRouter({
  findMany: baseProcedure.query(() => {
    return prisma.event.findMany()
  }),
  create: baseProcedure.input(CreateEventSchema).mutation(async ({ input }) => {
    const user = await prisma.user.findFirstOrThrow()

    return prisma.event.create({
      data: {
        authorId: user.id,
        ...input,
      },
    })
  }),
})
