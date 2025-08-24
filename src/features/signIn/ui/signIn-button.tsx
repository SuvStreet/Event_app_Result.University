'use client'

import { signIn } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

const SignInButton = () => {
  return (
    <button
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => signIn()}
    >
      <span className="text-xl font-semibold">Войти</span>
      <Image
        src="https://api.iconify.design/ic:baseline-arrow-forward.svg"
        alt="icon"
        width={20}
        height={20}
        className="rounded-full"
        priority
      />
    </button>
  )
}

export default SignInButton
