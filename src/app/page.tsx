import { HydrateClient, prefetch, trpc } from '@/server/trpc/server'
import { Suspense } from 'react'
import { ClientPage } from './components/client-page'

export default function Home() {
  prefetch(trpc.event.findMany.queryOptions())

  return (
    <HydrateClient>
      <Suspense fallback={<div>Loading...</div>}>
        <ClientPage />
      </Suspense>
    </HydrateClient>
  )
}
