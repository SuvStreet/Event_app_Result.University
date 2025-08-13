'use client'

import { useTRPC } from '@/shared/provides'
import { useMutation } from '@tanstack/react-query'

type JointEventButtonProps = {
  eventId: string
  onSuccess?: () => void
  action: string
}

export const JoinEventButton = ({
  eventId,
  onSuccess,
  action,
}: JointEventButtonProps) => {
  const trpc = useTRPC()

  const joinMutation = useMutation(
    trpc.event.join.mutationOptions({
      onSuccess,
    })
  )
  const leaveMutation = useMutation(
    trpc.event.leave.mutationOptions({ onSuccess })
  )

  const handleClick = () => {
    if (action === 'Участвовать') joinMutation.mutate({ id: eventId })
    else leaveMutation.mutate({ id: eventId })
  }

  const isLoading = joinMutation.isPending || leaveMutation.isPending

  return (
    <button
      className={`h-10 px-6 font-semibold rounded-md  text-white cursor-pointer ${
        action === 'Участвовать' ? 'bg-amber-950' : 'bg-red-500'
      }`}
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? 'Загрузка...' : action}
    </button>
  )
}
