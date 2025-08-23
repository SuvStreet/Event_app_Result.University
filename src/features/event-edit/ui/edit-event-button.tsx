'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'

const EditEventButton = () => {
  const params = useParams()
  const handleClick = () => {}

  return (
    <Link
      href={`/events/edit/${params.id}`}
      className="px-4 py-2 bg-blue-800 text-amber-50 text-md font-bold rounded cursor-pointer"
      onClick={handleClick}
    >
      Редактировать событие
    </Link>
  )
}

export default EditEventButton
