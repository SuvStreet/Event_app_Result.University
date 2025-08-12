import { HydrateClient, prefetch, trpc } from '@/server/trpc/server'
import { HomeLayout } from '@/features'

export default function Home() {
  prefetch(trpc.event.findMany.queryOptions())

  return (
    <HydrateClient>
      <HomeLayout />
    </HydrateClient>
  )
}
