import React from 'react'
import Image from 'next/image'

const welcome = () => {
  return (
    <div className="bg-gray-100 h-screen  dark:bg-gray-800 md:py-8">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 md:px-4">
                <div className="h-fit w-fit rounded-2xl bg-gray-100 dark:bg-gray-700 ">
                    <Image className=" object-cover" 
                    src="https://img.freepik.com/free-vector/rescue-teams-isometric-set_1284-25467.jpg?t=st=1710264004~exp=1710267604~hmac=75735c19b588070e465f938066cc12dabc0ba5c482e1b864b3528700f10fdef7&w=740" 
                    alt="Product Image"
                    width={500}
                    height={460}
                     />
                </div>
            </div>
            <div className="md:flex-1 md:px-4 lg:px-4">
            <div className="grid place-content-center rounded bg-gray-100 p-6 sm:p-8">
        <div className="mx-auto max-w-md text-center  lg:text-left">
          <header>
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">The Fastest In <span className='text-red-600'>Emergency </span>responses</h2>

            <p className="mt-4 text-gray-500">
            Our dedicated team ensures swift assistance when you need it most. Trust us for rapid, reliable service in any emergency situation.
            </p>
          </header>

          <button type="button" className="py-2 px-4 max-w-md flex justify-center mt-10 items-center bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
            Get Started
        </button>
        </div>
      </div>
            </div>
        </div>
    </div>
</div>

  )
}

export default welcome