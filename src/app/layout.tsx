import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {Navbar} from '@/components/navbar/page'
import Footer from '@/components/footer/page'
import Provider from '@/context/AuthContext'

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
      <body className={inter.className}>
        <div className='bg-gradient-to-r from-rose-100 to-teal-100 '>
        <Provider>
        <Navbar />
        {children}
        <Footer/>
        </Provider>
        
        </div>
        </body>
    </html>
  )
}
