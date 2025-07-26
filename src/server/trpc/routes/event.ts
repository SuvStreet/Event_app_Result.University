import prisma from '@/server/prisma'
import { baseProcedure, createTRPCRouter } from '@/server/trpc/init'

export const eventRouter = createTRPCRouter({
  findMany: baseProcedure.query(() => {
    return prisma.event.findMany()
  }),
})
