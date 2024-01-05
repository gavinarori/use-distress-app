'use client'
import React, { useState,useEffect } from 'react'
import { useSession ,signOut } from "next-auth/react";
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  

const Logout = () => {
    const {data: session} = useSession()
    const { image, email } = session?.user || {};
    const Session = useSession()
    const router = useRouter()
    


    useEffect(() => {
        if (Session?.status === 'unauthenticated') {
           router.push('/') 
        }
        
    })
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-md mx-auto md:max-w-2xl break-words bg-white w-full shadow-lg rounded-xl p-8">
        <div className="flex flex-wrap justify-center">
          <div className="w-full flex justify-center">
            <div className="relative">
              <img
                src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
                className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
              />
            </div>
          </div>
          <div className="w-full text-center mt-8">
            <div className="flex justify-center lg:pt-4 pt-8 pb-0"></div>
          </div>
        </div>
        <div className="text-center mt-2">
          <h3 className="text-2xl text-slate-700 font-bold leading-normal mb-1">{session?.user?.name}</h3>
          <div className="text-xs mt-0 mb-2 text-slate-400 font-bold">
            <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
            {session?.user?.email}
          </div>
        </div>
        <div className="mt-6 py-6 border-t border-slate-200 text-center">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4">
              <p className="font-light leading-relaxed text-slate-600 mb-4">
                An artist of considerable range, Mike is the name taken by Melbourne-raised, Brooklyn-based Nick Murphy
                writes, performs and records all of his own music, giving it a warm.
              </p>
              <button  onClick={() => signOut()} className='group relative h-9 w-48 overflow-hidden rounded-2xl bg-red-600 text-lg font-bold text-white'>Log out</button>
              
            </div>
          </div>
        </div>
      </div>
    </div>


  )
}

export default Logout