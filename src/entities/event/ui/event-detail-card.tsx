'use client'

import type { RouterOutput } from '@/shared/provides'
import { ReactNode } from 'react'

type EventDetailCardProps = NonNullable<RouterOutput['event']['findUnique']> & {
  action: ReactNode
}

export const EventDetailCard = ({
  title,
  description,
  date,
  participations,
  action,
}: EventDetailCardProps) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full min-w-2xl">
      <div className="flex justify-between justify-items-center mb-6">
        <h2 className="text-2xl font-bold">Информация о событии</h2>
        {action}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Название события:
        </label>
        <div className="mt-1 p-3 bg-gray-100 rounded-lg text-gray-500">
          {title}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Описание:
        </label>
        <div className="mt-1 p-3 bg-gray-100 rounded-lg text-gray-500">
          {description ? description : 'Описание отсутствует'}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Дата проведения:
        </label>
        <div className="mt-1 p-3 bg-gray-100 rounded-lg text-gray-500">
          {date.toLocaleDateString()}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600">
          Участники:
        </label>
        <div className="mt-1 p-3 bg-gray-100 rounded-lg text-gray-500">
          {participations.map(({ user }) => user.name).join(', ')}
        </div>
      </div>
    </div>
  )
}
