import prisma from '@/server/prisma'
import { baseProcedure, createTRPCRouter, isAuth } from '@/server/trpc/init'
import {
  CreateEventSchema,
  FindUniqueEventSchema,
  JoinEventSchema,
} from '@/shared/api/schema'

export const eventRouter = createTRPCRouter({
  findMany: baseProcedure.query(() => {
    return prisma.event.findMany()
  }),
  findUnique: baseProcedure
    .input(FindUniqueEventSchema)
    .use(isAuth)
    .query(({ input }) => {
      return prisma.event.findUnique({
        where: input,
        select: {
          title: true,
          description: true,
          date: true,
          participations: {
            select: {
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      })
    }),
  create: baseProcedure
    .input(CreateEventSchema)
    .use(isAuth)
    .mutation(({ input, ctx: { user } }) => {
      return prisma.event.create({
        data: {
          authorId: user.id,
          ...input,
        },
      })
    }),
  join: baseProcedure
    .input(JoinEventSchema)
    .use(isAuth)
    .mutation(({ input, ctx: { user } }) => {
      return prisma.participation.create({
        data: {
          eventId: input.id,
          userId: user.id,
        },
      })
    }),
})
