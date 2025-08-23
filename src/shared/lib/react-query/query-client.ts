import { defaultShouldDehydrateQuery, QueryClient } from '@tanstack/react-query'
import SuperJSON from 'superjson'

// Настройка QueryClient, чтобы избежать повторных запросов на клиенте после SSR.

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
      dehydrate: {
        serializeData: SuperJSON.serialize,
        
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
      hydrate: {
        deserializeData: SuperJSON.deserialize,
      },
    },
  })
}

// staleTime — сколько времени (в миллисекундах) кэш считается «свежим»
// и не перезапрашивается.

// shouldDehydrateQuery — решает, какие запросы стоит «вынести» с сервера
// на клиент (грубо говоря, сохранить в HTML, чтобы не делать запрос повторно).
