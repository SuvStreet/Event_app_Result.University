import z from 'zod'

export const CreateEventSchema = z.object({
  title: z.string().min(1, { message: 'Название события обязательно' }),
  description: z.string().optional(),
  date: z.coerce
    .date<Date>({
      error: (iss) => {
        if (iss.code === 'invalid_type')
          return { message: 'Дата события обязательна' }
        return { message: 'Неверный формат даты' }
      },
    })
    .min(new Date(), { error: 'Дата не может быть в прошлом' }),
})

export const UpdateEventSchema = z
  .object({
    id: z.string(),
  })
  .merge(CreateEventSchema)

export const JoinEventSchema = z.object({
  id: z.string(),
})

export const FindUniqueEventSchema = z.object({
  id: z.string(),
})
