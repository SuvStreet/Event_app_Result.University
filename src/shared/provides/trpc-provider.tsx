'use client'

import type { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { createTRPCClient, httpBatchLink } from '@trpc/client'
import { createTRPCContext } from '@trpc/tanstack-react-query'
import { useState } from 'react'
import { makeQueryClient } from '@/shared/lib/react-query/query-client'
import type { AppRouter } from '@/server/trpc/routes'
import SuperJSON from 'superjson'
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>()

let browserQueryClient: QueryClient

function getQueryClient() {
  if (typeof window === 'undefined') {
    return makeQueryClient()
  }

  if (!browserQueryClient) browserQueryClient = makeQueryClient()

  return browserQueryClient
}

function getUrl() {
  const base = (() => {
    if (typeof window !== 'undefined') return ''

    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`

    return 'http://localhost:3000'
  })()

  return `${base}/api/trpc`
}

export function TRPCReactProvider(
  props: Readonly<{
    session: Session | null
    children: React.ReactNode
  }>
) {
  const queryClient = getQueryClient()

  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          transformer: SuperJSON,
          url: getUrl(),
        }),
      ],
    })
  )

  return (
    <SessionProvider session={props.session}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          {props.children}
        </QueryClientProvider>
      </TRPCProvider>
    </SessionProvider>
  )
}

export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>
