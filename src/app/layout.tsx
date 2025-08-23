import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { TRPCReactProvider } from '@/shared/provides'
import './globals.css'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { Header } from '@/entities'
import { layoutConfig } from '@/shared/config'

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
          <div className="flex min-h-screen flex-col justify-between">
            <div className="flex flex-col">
              <Header />
              <main className="flex flex-col max-w-[1024px] mx-auto px-[24px] justify-start items-center">
                {children}
              </main>
            </div>
            <footer
              className="flex justify-center items-center"
              style={{ height: layoutConfig.footerHeight }}
            >
              <p className="text-sm font-bold">{new Date().getFullYear()}</p>
            </footer>
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  )
}
