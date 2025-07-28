'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useTRPC } from '../providers/trpc-provider'
import { EventCard } from '@/app/entities/event'

export function HomeClient() {
  const trpc = useTRPC()

  const { data } = useSuspenseQuery(trpc.event.findMany.queryOptions())

  return (
    <ul>
      {data.map((event) => (
        <li key={event.id}>
          <EventCard {...event} />
        </li>
      ))}
    </ul>
  )
}
