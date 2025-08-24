'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { layoutConfig } from '@/shared/config'
import Image from 'next/image'
import CreateEventButton from '@/features/event-create/ui/create-event-button'
import SignInButton from '@/features/signIn/ui/signIn-button'

export const Header = () => {
  const { data } = useSession()

  return (
    <header
      style={{
        height: layoutConfig.headerHeight,
      }}
      className="flex items-center justify-between px-6 py-4 bg-gray-200 "
    >
      <Link
        href="/"
        className="flex justify-center items-center text-lg font-bold hover:opacity-80"
      >
        <Image
          src="https://api.iconify.design/logos:nextjs-icon.svg"
          alt="icon"
          width={32}
          height={32}
          priority
        />
        <span className="ml-2">NextJS</span>
      </Link>

      <div className="flex items-center gap-4">
        {data?.user ? (
          <>
            <button
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => signOut()}
            >
              <span className="font-bold text-2xl">{data.user.name}</span>
              <Image
                src="https://api.iconify.design/ic:baseline-arrow-back.svg"
                alt="icon"
                width={20}
                height={20}
                className="rounded-full"
                priority
              />
            </button>
            <CreateEventButton />
          </>
        ) : (
          <SignInButton />
        )}
      </div>
    </header>
  )
}
