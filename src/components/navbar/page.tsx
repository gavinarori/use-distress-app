'use client'
import React from 'react'
import { useSession } from "next-auth/react";
import Image from "next/image";
import BuyMeACoffee from '@/app/icons/BuyMeCoffee';
import Github from '@/app/icons/github';
import { nFormatter } from "@/lib/utils";


export const Navbar =  async () => {
  const { data: session } = useSession();
  const { image, email } = session?.user || {};
  const { stargazers_count: stars } = await fetch(
    "https://api.github.com/repos/gavinarori/use-distress-app",
    {
      ...(process.env.GITHUB_OAUTH_TOKEN && {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      }),
      // data will revalidate every 24 hours
      next: { revalidate: 86400 },
    },
  )
    .then((res) => res.json())
    .catch((e) => console.log(e));
  
  return (
    <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%]">
    <div className="sticky z-10 top-0 h-16 border-b bg-white lg:py-2.5">
        <div className="px-6 flex items-center justify-between space-x-4 2xl:container">
            <h5 hidden className="text-2xl text-gray-600 font-medium lg:block">Dashboard</h5>
            <button className="w-12 h-16 -mr-2 border-r lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 my-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <div className="flex space-x-4">
                {/*/search bar */}
                <a
            className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-1 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
            href="https://github.com/gavinarori/use-distress-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
            <p>
              <span className="hidden sm:inline-block">Star on</span> GitHub{" "}
              <span className="font-semibold">{nFormatter(stars)}</span>
            </p>
          </a>
                <a
        href="https://www.buymeacoffee.com/arorigavin"
        target="_blank"
        rel="noopener noreferrer"
        className="mx-auto mt-2 flex max-w-fit items-center justify-center space-x-2 rounded-lg border border-gray-200 bg-white px-6 py-2 transition-all duration-75 hover:scale-105"
      >
        <BuyMeACoffee className="h-6 w-6" />
        
      </a>
            </div>
        </div>
    </div>
</div>

  )
}
