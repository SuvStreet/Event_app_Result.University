import { HydrateClient, prefetch, trpc } from '@/server/trpc/server'
import { HomeLayout } from '@/features'

export default async function Home() {
  prefetch(trpc.event.findMany.queryOptions())

  return (
    <HydrateClient>
      <HomeLayout />
    </HydrateClient>
  )
}
