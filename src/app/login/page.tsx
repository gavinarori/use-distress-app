"use client"
import { signIn , useSession} from "next-auth/react";
import { useRouter } from "next/navigation"
import React, { useState,useEffect } from 'react'
import Image from 'next/image'
import LoadingDots from "../icons/loading-dots";



const Login = () => {
  const { data: session, status }:any = useSession();
  const router = useRouter();
  const [signInClicked, setSignInClicked] = useState(false);

  if (status === "authenticated") {
    router.push("/");
    console.log("The session has been authenticated successfully");
  }
  return (
<section className="bg-white">
  <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
    <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
      <img
        alt=""
        data-testid="Login_image"
        src="https://img.freepik.com/free-vector/hand-drawn-asian-family-illustration_23-2149425676.jpg?t=st=1710262304~exp=1710265904~hmac=b491de63b42647a2ae2c532efc3132fe0d33fa26bbf52feaabc07e7759f423aa&w=740"
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />

      <div className="hidden lg:relative lg:block lg:p-12">
        <a className="flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20" href="#">
          <span className="sr-only">Home</span>
          <Image
            src="/next.svg"
            data-testid="Login_image_1"
            className='h-8 sm:h-10'
            width={500}
            height={500}
            alt="Picture of the author"
            />
        </a>

        <h2 data-testid="text-title" className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
          Welcome to <span className=''>Distress</span>
        </h2>

        <p data-testid="text-paragraph" className="mt-4 leading-relaxed text-white/90">
        Swift and reliable emergency responses: your safety is our priority. Trust us for quick assistance when you need it most.
        </p>
      </div>
    </section>

    <main
      className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
    >
      <div className="max-w-xl lg:max-w-3xl">
        <div className="relative -mt-16 block lg:hidden">
          <a
            className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20"
            
          >
            <span className="sr-only">Home</span>
            <Image
      src="/next.svg"
      data-testid="Login_image_1"
      className='h-8 sm:h-10 '
      width={500}
      height={500}
      alt="Picture of the author"
    />
          </a>

          <h1  className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            Welcome to <span className='text-red-600'>Distress</span>
          </h1>

          <p  className="mt-4 leading-relaxed text-gray-500">
          Swift and reliable emergency responses: your safety is our priority. Trust us for quick assistance when you need it most.
          </p>
        </div>

        <form  className="mt-8 grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <label  className="flex gap-4">
              <input
                type="checkbox"
                className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
              />

              <span data-testid="checkbox-desc" className="text-sm text-gray-700">
                I want to receive emails about events, product updates and company announcements.
              </span>
            </label>
          </div>

          <div className="col-span-6">
            <p data-testid="terms-condition-desc" className="text-sm text-gray-500">
              By creating an account, you agree to our
              <a href="#" className="text-gray-700 underline"> terms and conditions </a>
              and
              <a href="#" className="text-gray-700 underline ml-1">privacy policy</a>.
            </p>
          </div>

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
          <button         onClick={() => {
          setSignInClicked(true);
          signIn("google");
        }}  className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
        disabled={signInClicked}>
        <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
        {signInClicked ? (
              <LoadingDots color="#FF8080"  />
            ) : (
              <span>Login with Google</span>
            )}
    </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</section>
  )
}

export default Login