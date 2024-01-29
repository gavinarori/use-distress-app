import React from 'react'

const Insights = () => {
  return (
    <header className="py-12 px-4 sm:px-6 lg:px-8" >
        <div className="relative mx-auto max-w-[37.5rem] pt-20 text-center pb-20" >
            <div className="flex items-center justify-center space-x-3">
                <img loading="lazy" src="/logo.png" alt="Logspot" className="h-20 w-20" />
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-700 sm:text-5xl"> logspot </h1>
            </div>
                <p className="mt-4 text-base leading-7 text-slate-600"> Logspot is an open source change log template made with Nuxt, Vue, and Tailwindcss. Subscribe to our newsletter to get the latest updates or follow us on 
                <a className="text-primary underline" href="https://twitter.com/fayazara" target="_blank">twitter</a>
                . </p>
                </div>
    </header>
  )
}

export default Insights;