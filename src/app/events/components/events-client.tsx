'use client'

import { useTRPC } from '@/app/providers/trpc-provider'
import { CreateEventForm, CreateEventValues } from '@/features/create-event'
import { useMutation } from '@tanstack/react-query'

export function EventsClient() {
  const trpc = useTRPC()

  const { mutate} = useMutation(trpc.event.create.mutationOptions())

  const handleSubmit = (data: CreateEventValues) => {
    mutate(data)
  }

  return (
    <div className="mx-auto max-w-4xl">
      <CreateEventForm onSubmit={handleSubmit} />
    </div>
  )
}
