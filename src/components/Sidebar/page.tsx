'use client'
import React from 'react'
import { useSession ,signOut } from "next-auth/react";
import Image from "next/image";

interface SidebarProps {
    isOpen: boolean;
    setCurrentView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setCurrentView }) => {
    const { data: session } = useSession();
  const { image, email } = session?.user || {};
  
    return (
        <aside className={`fixed z-10 top-0 pb-3 px-6 w-auto flex flex-col justify-between h-screen border-r bg-white transition-transform duration-300
        ${isOpen ? 'transform-none' : '-translate-x-full'} md:w-4/12 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] lg:translate-x-0`}>
            <div>
                <div className="-mx-6 px-6 py-4 flex flex-row">
                    <a href="#" title="home">
                        <img src="/next.svg" className="w-10 h-10" alt="tailus logo" />
                    </a>
                    <h1 className='ml-2 text-[30px] uppercase leading-10 text-red-600'>Distress</h1>
                </div>

                <div className="mt-8 text-center">
            <img
            alt=''
            src={image || `https://avatars.dicebear.com/api/micah/${email}.svg`}
           
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28" />
                    <h5 className=" mt-4 text-xl font-semibold text-gray-600 lg:block">{session?.user?.name}</h5>
                    <span className=" text-gray-400 lg:block">{session?.user?.email}</span>
                </div>

                <ul className="space-y-2 tracking-wide mt-8">
                    <li>
                        <a onClick={() => setCurrentView('cards')}  aria-label="dashboard" className="relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white ">
                            <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                                <path d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z" className="fill-current text-cyan-400 dark:fill-slate-600"></path>
                                <path d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z" className="fill-current text-cyan-200 group-hover:text-red-500"></path>
                                <path d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z" className="fill-current group-hover:text-sky-300"></path>
                            </svg>
                            <span className="-mr-1 font-medium group-hover:text-gray-700">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a onClick={() => setCurrentView('insights')}  className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path className="fill-current text-gray-300 group-hover:text-red-500" fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clipRule="evenodd" />
                                <path className="fill-current text-gray-600 group-hover:text-red-500" d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
                            </svg>
                            <span className="group-hover:text-gray-700">insights</span>
                        </a>
                    </li>
                    <li>
                        <a onClick={() => setCurrentView('googlemaps')}  className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path className="fill-current text-gray-600 group-hover:text-red-500" fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                                <path className="fill-current text-gray-300 group-hover:text-red-500" d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                            </svg>
                            <span className="group-hover:text-gray-700">crime Map</span>
                        </a>
                    </li>
                    <li>
                        <a onClick={() => setCurrentView('analytics')}  className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path className="fill-current text-gray-600 group-hover:text-red-500" d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                                <path className="fill-current text-gray-300 group-hover:text-red-500" d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                            </svg>
                            <span className="group-hover:text-gray-700">Analytics</span>
                        </a>
                    </li>
                </ul>
            </div>

            <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
                <button onClick={() => signOut()}  className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="group-hover:text-gray-700">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
