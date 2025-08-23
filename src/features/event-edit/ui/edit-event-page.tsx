'use client'

import { useTRPC } from '@/shared/provides'
import { CreateEventValues, EventForm } from '@/entities/event/ui/event-form'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'

const EditEventPage = () => {
  const { id } = useParams()
  const trpc = useTRPC()
  const route = useRouter()
  const [isPending, startTransition] = useTransition()

  const { data, isLoading, error } = useSuspenseQuery(
    trpc.event.findUnique.queryOptions({ id: String(id) })
  )

  const { mutate } = useMutation(trpc.event.update.mutationOptions())

  const handleSubmit = (data: CreateEventValues) => {
    startTransition(() => {
      mutate({ ...data, id: String(id) })
      route.refresh()
      route.push('/')
    })
  }

  const getHelperText = () => {
    return (
      <p className="mt-1 text-sm leading-6 text-gray-600">
        Отредактируйте событие и сохраните его для обновления.
      </p>
    )
  }

  if (isLoading) return <p className="text-2xl text-center">Загрузка...</p>

  if (error)
    return <p className="text-2xl text-center text-red-500">{error.message}</p>

  if (!data)
    return (
      <p className="text-2xl text-center text-red-500">Событие не найдено</p>
    )

  return (
    <EventForm
      helperText={getHelperText()}
      onSubmit={handleSubmit}
      initialEvent={{
        title: data.title,
        description: data.description ?? undefined,
        date: data.date,
      }}
      isPending={isPending}
    />
  )
}

export default EditEventPage
