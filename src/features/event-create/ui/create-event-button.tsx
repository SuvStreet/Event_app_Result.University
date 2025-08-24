'use client'

import Link from "next/link"

const CreateEventButton = () => {
  return (
    <Link
      href={`/events/create`}
      className="px-4 py-2 bg-green-600 text-amber-50 text-md rounded cursor-pointer"
    >
      Создать событие
    </Link>
  )
}

export default CreateEventButton