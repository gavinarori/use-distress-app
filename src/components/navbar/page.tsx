'use client'
import React from 'react'
import { useSession } from "next-auth/react";
import Image from "next/image";


export const Navbar = () => {
  const { data: session } = useSession();
  const { image, email } = session?.user || {};
  
  return (
    <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
  <div className="px-4">
    <div className="flex items-center justify-between">
      <div className="flex shrink-0">
        <a aria-current="page" className="flex items-center" href="/">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-9" viewBox="0 0 32 32"><path d="M22.65 19.25a1 1 0 0 0-1.41 0l-1 1a2.17 2.17 0 0 1-3 0L11.92 15a2.44 2.44 0 0 1 0-3.46l.79-.89a.53.53 0 0 0 .06-.1.94.94 0 0 0 .49-.32 1 1 0 0 0-.15-1.4L8.43 5a1 1 0 0 0-1.34.07l-1 1a10.2 10.2 0 0 0 0 14.42L11.58 26a10.09 10.09 0 0 0 14.24 0l1.07-1.07a1 1 0 0 0 0-1.42zm1.75 5.32a8.08 8.08 0 0 1-11.4 0l-5.48-5.48a8.2 8.2 0 0 1 0-11.58l.35-.35L11 9.65l-.46.53a4.42 4.42 0 0 0 0 6.24l5.28 5.28a4.1 4.1 0 0 0 5.82 0l.33-.33 2.83 2.83zm-.95-10.48c.76-1.15.4-2.13-1.51-4s-2.88-2.27-4-1.51a1 1 0 0 1-1.14-1.7c2.89-1.91 5.36.57 6.56 1.76s3.64 3.67 1.76 6.56a1 1 0 0 1-.83.44 1 1 0 0 1-.56-.16 1 1 0 0 1-.28-1.39zm4.48 4a1 1 0 0 1-.78.37 1 1 0 0 1-.63-.22 1 1 0 0 1-.15-1.4c3.23-4 0-8.09-1.6-9.65s-5.61-4.83-9.65-1.6a1 1 0 0 1-1.4-.15 1 1 0 0 1 .15-1.41c3.62-2.9 8.34-2.23 12.32 1.74s4.64 8.74 1.74 12.36z"/></svg>
          <p className="">Distress App</p>
        </a>
      </div>
      <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
        <a aria-current="page"
          className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
          href="/analytics">How it works</a>
        <a className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
          href="/pricing">Pricing</a>
      </div>
      <div className="flex items-center justify-end gap-3">
      {session ? (
              <a href="/logout">
                              <button
          className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9"
        >
          <Image
            alt=''
            src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
            width={40}
            height={40}
          />
        </button>
              </a>

            ) : (
<a className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          href="/login">Login</a>
              
          )}
      </div>
    </div>
  </div>
</header>

  )
}
