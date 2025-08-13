'use client'

import { EventDetailCard } from '@/entities'
import { useTRPC } from '@/shared/provides'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export const EventDetailLayout = () => {
  const params = useParams()
  const trpc = useTRPC()

  const { data, isLoading } = useSuspenseQuery(
    trpc.event.findUnique.queryOptions({ id: String(params.id) })
  )

  if (isLoading) return <div>Загрузка...</div>

  if (!data) return <div>Событие не найдено</div>

  return <EventDetailCard {...data} />
}
