"use client"
import { signIn , useSession} from "next-auth/react";
import { useRouter } from "next/navigation"
import React, { useState,useEffect } from 'react'

const Login = () => {
  const session = useSession()
  const router = useRouter()  
  const [signInClicked, setSignInClicked] = useState(false);

  useEffect(() => {
    if (session?.status === 'authenticated') {
       router.push('/') 
    }
    
})
  return (
    <div className="h-screen w-screen bg-gray-400">

    {/* modal */}
    <div className="fixed grid place-items-center backdrop-blur-sm top-0 right-0 left-0 z-50 w-full inset-0 h-modal h-full justify-center items-center">
      <div className="relative container m-auto px-6">
        <div className="m-auto md:w-7/12">
          <div className="rounded-xl bg-white dark:bg-gray-800 shadow-xl">
            <div className="p-8">
              <div className="space-y-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-9" viewBox="0 0 32 32"><path d="M22.65 19.25a1 1 0 0 0-1.41 0l-1 1a2.17 2.17 0 0 1-3 0L11.92 15a2.44 2.44 0 0 1 0-3.46l.79-.89a.53.53 0 0 0 .06-.1.94.94 0 0 0 .49-.32 1 1 0 0 0-.15-1.4L8.43 5a1 1 0 0 0-1.34.07l-1 1a10.2 10.2 0 0 0 0 14.42L11.58 26a10.09 10.09 0 0 0 14.24 0l1.07-1.07a1 1 0 0 0 0-1.42zm1.75 5.32a8.08 8.08 0 0 1-11.4 0l-5.48-5.48a8.2 8.2 0 0 1 0-11.58l.35-.35L11 9.65l-.46.53a4.42 4.42 0 0 0 0 6.24l5.28 5.28a4.1 4.1 0 0 0 5.82 0l.33-.33 2.83 2.83zm-.95-10.48c.76-1.15.4-2.13-1.51-4s-2.88-2.27-4-1.51a1 1 0 0 1-1.14-1.7c2.89-1.91 5.36.57 6.56 1.76s3.64 3.67 1.76 6.56a1 1 0 0 1-.83.44 1 1 0 0 1-.56-.16 1 1 0 0 1-.28-1.39zm4.48 4a1 1 0 0 1-.78.37 1 1 0 0 1-.63-.22 1 1 0 0 1-.15-1.4c3.23-4 0-8.09-1.6-9.65s-5.61-4.83-9.65-1.6a1 1 0 0 1-1.4-.15 1 1 0 0 1 .15-1.41c3.62-2.9 8.34-2.23 12.32 1.74s4.64 8.74 1.74 12.36z"/></svg>
                <h2 className="mb-8 text-2xl text-cyan-900 dark:text-white font-bold">Log in to unlock the <br />best of Distress app.</h2>
              </div>
              <div className="mt-10 grid space-y-4">
                <button onClick={() => {
              setSignInClicked(true);
              signIn("google");
            }} className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                  <div className="relative flex items-center space-x-4 justify-center">
                  {signInClicked ? (
              <svg width="20"  height="20" fill="currentColor" className="mr-2 text-red-600 animate-spin" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
              <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z">
              </path>
          </svg>
          
            ) : (
              <>
                 <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="absolute left-0 w-5" alt="Google Logo" />
                    <span className="block w-max font-semibold tracking-wide text-gray-700 dark:text-white text-sm transition duration-300 group-hover:text-blue-600 sm:text-base">Continue with Google</span>
              </>
            )}
                   
                  </div>
                </button>
                <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-blue-400 focus:bg-blue-50 active:bg-blue-100">
                  <div className="relative flex items-center space-x-4 justify-center">
                  <img className="h-7 w-auto" src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt=""/>
                    <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition dark:text-white duration-300 group-hover:text-blue-600 sm:text-base">Continue with Apple</span>
                  </div>
                </button>
              </div>
              <div className="mt-14 space-y-4 py-3 text-gray-600 dark:text-gray-400 text-center">
                <p className="text-xs">By proceeding, you agree to our
                  <a href="/privacy-policy/" className="underline">Terms of Use</a>
                  and confirm you have read our
                  <a href="/privacy-policy/" className="underline">Privacy and Cookie Statement</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
  )
}

export default Login 