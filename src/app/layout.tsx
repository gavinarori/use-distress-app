import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {Navbar} from '@/components/navbar/page'
import Footer from '@/components/footer/page'
import Provider from '@/context/AuthContext'
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from 'react';
import Loading from './loading'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
      <div className=''>
        <Provider>
        <Suspense fallback={<Loading />}>
        {children}
      </Suspense>
        </Provider>
        </div>
        <Toaster />
        </body>
    </html>
  )
}
