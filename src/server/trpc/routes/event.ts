import prisma from '@/server/prisma'
import { baseProcedure, createTRPCRouter, isAuth } from '@/server/trpc/init'
import {
  CreateEventSchema,
  FindUniqueEventSchema,
  JoinEventSchema,
  UpdateEventSchema,
} from '@/shared/api/schema'

export const eventRouter = createTRPCRouter({
  findMany: baseProcedure.query(async ({ ctx: { user } }) => {
    const events = await prisma.event.findMany({
      include: {
        participations: true,
      },
    })

    return events.map(({ participations, ...event }) => ({
      ...event,
      isJoined: participations.some(({ userId }) => userId === user?.id),
    }))
  }),
  findUnique: baseProcedure.input(FindUniqueEventSchema).query(({ input }) => {
    return prisma.event.findUnique({
      where: input,
      select: {
        title: true,
        description: true,
        date: true,
        author: {
          select: {
            id: true,
          },
        },
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
    .mutation(async ({ input, ctx: { user } }) => {
      const event = await prisma.event.create({
        data: {
          authorId: user.id,
          ...input,
        },
      })

      await prisma.participation.create({
        data: {
          eventId: event.id,
          userId: user.id,
        },
      })

      return event
    }),
  update: baseProcedure
    .input(UpdateEventSchema)
    .use(isAuth)
    .mutation(async ({ input }) => {
      return prisma.event.update({
        where: {
          id: input.id,
        },
        data: {
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
  leave: baseProcedure
    .input(JoinEventSchema)
    .use(isAuth)
    .mutation(({ input, ctx: { user } }) => {
      return prisma.participation.deleteMany({
        where: {
          eventId: input.id,
          userId: user.id,
        },
      })
    }),
})
