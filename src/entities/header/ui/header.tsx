'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { Icon } from '@iconify-icon/react'

export const Header = () => {
  const { data } = useSession()

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-200">
      <Link href="/" className="flex justify-center items-center text-lg font-bold hover:opacity-80">
        <Icon icon="ic:sharp-event-note" width={32} height={32} />
        List of events
      </Link>

      <div className="flex items-center gap-4">
        {data?.user ? (
          <>
            <span>{data.user.name}</span>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 cursor-pointer"
            >
              Выйти
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn()}
            className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 cursor-pointer"
          >
            Войти
          </button>
        )}
      </div>
    </header>
  )
}
