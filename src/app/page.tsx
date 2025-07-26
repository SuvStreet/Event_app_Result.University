import prisma from '@/server/prisma'

import { HydrateClient, prefetch, trpc } from '@/server/trpc/server'
import { Suspense } from 'react'
import { ClientPage } from './components/client-page'

export default async function Home() {
  prefetch(trpc.hello.queryOptions({ text: 'name' }))

  // const user = await prisma.user.findMany()

  return (
    <HydrateClient>
        <Suspense fallback={<div>Loading...</div>}>
          <ClientPage />
        </Suspense>
    </HydrateClient>
  )
}
