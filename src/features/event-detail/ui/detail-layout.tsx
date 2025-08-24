'use client'

import { EventDetailCard } from '@/entities'
import EditEventButton from '@/features/event-edit/ui/edit-event-button'
import { useTRPC } from '@/shared/provides'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'

export const EventDetailLayout = () => {
  const params = useParams()
  const session = useSession()
  const trpc = useTRPC()

  const { data, isLoading } = useSuspenseQuery(
    trpc.event.findUnique.queryOptions({ id: String(params.id) })
  )

  const isAuthorEvent = data?.author.id === session?.data?.user.id

  if (isLoading) return <div>Загрузка...</div>

  if (!data) return <div>Событие не найдено</div>

  return (
    <EventDetailCard action={isAuthorEvent && <EditEventButton />} {...data} />
  )
}
