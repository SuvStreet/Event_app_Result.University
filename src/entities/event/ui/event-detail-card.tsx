import type { RouterOutput } from '@/shared/provides'

type EventDetailCardProps = NonNullable<RouterOutput['event']['findUnique']>

export const EventDetailCard = ({
  title,
  description,
  date,
  participations,
}: EventDetailCardProps) => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mx-4">
      <h2 className="text-2xl font-bold mb-6">Информация о событии</h2>

      {/* Название */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Название события:
        </label>
        <div className="mt-1 p-3 bg-gray-100 rounded-lg text-gray-500">
          {title}
        </div>
      </div>

      {/* Описание */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Описание:
        </label>
        <div className="mt-1 p-3 bg-gray-100 rounded-lg text-gray-500">
          {description ? description : 'Описание отсутствует'}
        </div>
      </div>

      {/* Дата проведения */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">
          Дата проведения:
        </label>
        <div className="mt-1 p-3 bg-gray-100 rounded-lg text-gray-500">
          {date.toLocaleDateString()}
        </div>
      </div>

      {/* Участники */}
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
