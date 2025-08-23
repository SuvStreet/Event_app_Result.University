'use client'

import { useTRPC } from '@/shared/provides'
import { EventForm, CreateEventValues } from '@/entities/event/ui/event-form'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

export function CreateEventPage() {
  const trpc = useTRPC()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const { mutate } = useMutation(trpc.event.create.mutationOptions())

  const handleSubmit = (data: CreateEventValues) => {
    startTransition(() => {
      mutate(data)
      router.refresh()
      router.push('/')
    })
  }

  return (
    <EventForm
      helperText={<p>Заполните форму для создания события</p>}
      onSubmit={handleSubmit}
      isPending={isPending}
    />
  )
}
