import { HydrateClient, prefetch, trpc } from '@/server/trpc/server'
import { Suspense } from 'react'
import { HomeClient } from './components/home-client'

export default function Home() {
  prefetch(trpc.event.findMany.queryOptions())

  return (
    <HydrateClient>
      <Suspense fallback={<div>Loading...</div>}>
        <HomeClient />
      </Suspense>
    </HydrateClient>
  )
}
