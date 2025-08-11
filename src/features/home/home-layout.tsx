'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useTRPC } from '@/shared/provides'
import { Card } from './components/card'
import { JoinEventButton } from '@/features/event-join'

export function HomeLayout() {
  const trpc = useTRPC()

  const { data } = useSuspenseQuery(trpc.event.findMany.queryOptions())

  return (
    <ul>
      {data.map((event) => (
        <li className="my-4 mx-4" key={event.id}>
          <Card {...event} action={<JoinEventButton eventId={event.id} />} />
        </li>
      ))}
    </ul>
  )
}
