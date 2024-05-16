import type { Metadata, Viewport } from "next";
import { Inter } from 'next/font/google'
import './globals.css'
import {Navbar} from '@/Components/navbar/page'
import Footer from '@/Components/footer/page'
import Provider from '@/context/AuthContext'
import { Toaster } from "@/Components/ui/toaster"
import { Suspense } from 'react';
import Loading from './loading'

const APP_NAME = "Distress App";
const APP_DEFAULT_TITLE = "Fastest Emergency response Distress  App";
const APP_TITLE_TEMPLATE = "Distress application";
const APP_DESCRIPTION = "Swift and reliable emergency responses: your safety is our priority. Trust us for quick assistance when you need it most.";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

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
