'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useTRPC } from '../providers/trpc-provider'

export function ClientPage() {
  const trpc = useTRPC()

  const { data } = useSuspenseQuery(trpc.hello.queryOptions({ text: 'name' }))

  return (
    <pre>
      {data.greeting}, {data.date.toDateString()}
    </pre>
  )
}
