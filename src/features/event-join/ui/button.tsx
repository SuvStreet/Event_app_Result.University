'use client'

import { useTRPC } from '@/shared/provides'
import { useMutation } from '@tanstack/react-query'

type JointEventButtonProps = {
  eventId: string
  onSuccess?: () => void
}

export const JoinEventButton = ({
  eventId,
  onSuccess,
}: JointEventButtonProps) => {
  const trpc = useTRPC()

  const { mutate } = useMutation(trpc.event.join.mutationOptions({ onSuccess }))

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
