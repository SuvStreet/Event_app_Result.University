import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { TRPCReactProvider } from '@/shared/provides'
import './globals.css'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { Header } from '@/entities'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Event App',
  description: 'Приложение для создания и участия в мероприятиях',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="ru">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TRPCReactProvider session={session}>
          <Header />
          <div className="w-full max-w-[1200px] mx-auto">{children}</div>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
