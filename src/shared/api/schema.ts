import z from 'zod'

export const CreateEventSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  date: z.coerce.date<Date>(),
})

export const JoinEventSchema = z.object({
  id: z.string(),
})