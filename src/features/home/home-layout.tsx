'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useTRPC } from '@/shared/provides'
import { Card } from './components/card'

export function HomeLayout() {
  const trpc = useTRPC()

  const { data } = useSuspenseQuery(trpc.event.findMany.queryOptions())

  return (
    <ul>
      {data.map((event) => (
        <li key={event.id}>
          <Card {...event} />
        </li>
      ))}
    </ul>
  )
}
