import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

type EventCardProps = {
  id: string
  title: string
  description: string | null
  date: Date
  action: ReactNode
}

export function Card({ id, title, description, date, action }: EventCardProps) {
  return (
    <div className="flex font-sans shadow-xl">
      <div className="flex-none w-48 relative">
        <Image
          src="/poster/poster.jpeg"
          alt="poster"
          className="w-24 h-24 object-cover rounded-xl mr-4"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>
      <div className="flex-auto p-6">
        <div className="flex flex-wrap -mt-6 pt-6 pb-6">
          <h1 className="flex-auto text-lg font-semibold text-amber-950-50">
            {title}
          </h1>
          <div className="text-lg font-semibold text-zinc-500">
            {date.toLocaleDateString()}
          </div>
          <div className="w-full flex-none text-sm font-medium text-zinc-500 mt-2">
            {description}
          </div>
        </div>

        <div className="flex space-x-4 text-sm font-medium">
          <div className="flex-auto flex space-x-4">
            {action}
          </div>
          <Link
            href={`/events/${id}`}
            className="h-10 px-6 font-semibold rounded-md border border-gray-200 text-green-400 align-middle flex items-center"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  )
}
