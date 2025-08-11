'use client'

import { useTRPC } from '@/shared/provides'
import { useMutation } from '@tanstack/react-query'

type JointEventButtonProps = {
  eventId: string
}

export const JoinEventButton = ({ eventId }: JointEventButtonProps) => {
  const trpc = useTRPC()

  const { mutate } = useMutation(trpc.event.join.mutationOptions())

  const handleClick = () => {
    mutate({ id: eventId })
  }

  return (
    <button
      className="h-10 px-6 font-semibold rounded-md bg-gray-600 text-white cursor-pointer"
      onClick={handleClick}
    >
      Участвовать
    </button>
  )
}
