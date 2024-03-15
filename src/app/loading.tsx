import React from 'react'
import Image from "next/image";

const Loading = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center   p-24">
    <div className="relative flex place-items-center bg-white z-[-1]">
      <Image
        className="relative bg-white"
        src="/distress-app-high-resolution-logo (2).png"
        alt="face Logo"
        width={180}
        height={37}
        priority
      />
    </div>


  </main>
  )
}

export default Loading