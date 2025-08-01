'use client'

import { useTRPC } from '@/shared/provides'
import {
  CreateEventForm,
  CreateEventValues,
} from './components/create-event-form'
import { useMutation } from '@tanstack/react-query'

export function NewEventLayout() {
  const trpc = useTRPC()

  const { mutate } = useMutation(trpc.event.create.mutationOptions())

  const handleSubmit = (data: CreateEventValues) => {
    mutate(data)
  }

  return <CreateEventForm onSubmit={handleSubmit} />
}
