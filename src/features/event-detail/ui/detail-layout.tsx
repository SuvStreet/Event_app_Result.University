'use client'

import { EventDetailCard } from '@/entities'
import { useTRPC } from '@/shared/provides'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export const EventDetailLayout = () => {
  const params = useParams()
  const trpc = useTRPC()

  const { data, isLoading } = useQuery(
    trpc.event.findUnique.queryOptions({ id: String(params.id) })
  )

  if (isLoading) return <div>Загрузка...</div>

  if (!data) return <div>Событие не найдено</div>

  return <EventDetailCard {...data} />
}
