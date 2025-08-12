import { EventDetailLayout } from '@/features/event-detail'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function Event() {
  const session = await getServerSession()

  if (!session) redirect('/api/auth/signin')

  return <EventDetailLayout />
}
