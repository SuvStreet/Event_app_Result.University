import prisma from '@/server/prisma'

export default async function Home() {
  const user = await prisma.user.findMany()

  return <pre>{JSON.stringify(user, null, 2)}</pre>
}
