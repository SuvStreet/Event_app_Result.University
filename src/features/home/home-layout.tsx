'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useTRPC } from '@/shared/provides'
import { Card } from './components/card'
import { JoinEventButton } from '@/features/event-join'
import { useSession } from 'next-auth/react'

export function HomeLayout() {
  const { data: session } = useSession()
  const trpc = useTRPC()
  const { data, refetch } = useSuspenseQuery(trpc.event.findMany.queryOptions())

  return (
    <>
      <ul>
        {data.map((event) => (
          <li className="my-4 mx-4" key={event.id}>
            <Card
              {...event}
              action={
                session?.user && (
                  <JoinEventButton
                    action={event.isJoined ? 'Отписаться' : 'Участвовать'}
                    onSuccess={refetch}
                    eventId={event.id}
                  />
                )
              }
            />
          </li>
        ))}
      </ul>
    </>
  )
}
