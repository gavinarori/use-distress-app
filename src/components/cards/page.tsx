"use client"
import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function Cards({ onSVGClick }:any) {
  const [currentDate, setCurrentDate] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [showSVG, setShowSVG] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const options : any = { weekday: 'short', month: 'short', day: 'numeric' };
      const formattedDate = now.toLocaleDateString('en-US', options);
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`;

      setCurrentDate(formattedDate);
      setCurrentTime(formattedTime);
    }, 1000);

    // Clear interval on unmount
    return () => clearInterval(interval);
  }, []);
  const handleClick = () => {
    setShowSVG(!showSVG);
    onSVGClick();
  };
    return (
        <div className="  flex justify-center item-center lg:ml-[290px]  pt-6 ">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="md:col-span-2 lg:col-span-1">
            <div className="h-full py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
            {showSVG  ? (
        <svg
          className='cursor-pointer'
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="Capa_1"
          x="0px"
          y="0px"
          viewBox="0 0 455 455"
          xmlSpace="preserve"
          onClick={handleClick}
        >
            <g>
      <path style={{ fill: '#BF3131' }} d="M443.435,299.28c7.5-22.57,11.565-46.7,11.565-71.78c0-25.75-4.285-50.5-12.165-73.58l-45.58-77.865 c-32.37-36.26-76.165-62.08-125.745-71.79h-88.02c-49.58,9.71-93.385,35.53-125.755,71.79l-45.57,77.865 C4.285,177,0,201.75,0,227.5c0,25.08,4.065,49.22,11.565,71.79l43.685,76.83c32.59,37.74,77.38,64.655,128.24,74.615h88.02 c50.86-9.97,95.64-36.875,128.23-74.615L443.435,299.28z" />
      <path style={{ fill: '#BF3131' }} d="M400.41,227.5L314.323,76.65L271.51,4.265C257.27,1.465,242.55,0,227.49,0 c-15.05,0-29.77,1.465-44,4.265L140.677,76.65L54.59,227.5c0,0-43.02,71.79-43.03,71.79c9.48,28.54,24.46,54.57,43.69,76.83 l85.53,0.885h173.44l85.52-0.885c19.24-22.26,34.215-48.3,43.695-76.84L400.41,227.5z" />
      <path style={{ fill: '#BF3131' }} d="M397.25,76.06l-82.927,0.59l-43.883,75.84h-85.88l-43.883-75.84l-82.942-0.595 c-20.01,22.41-35.65,48.815-45.57,77.865L54.59,227.5h86.19l43.78,75.01l-43.78,74.495l42.71,73.725 c14.23,2.81,28.95,4.27,44,4.27 c15.06,0,29.78-1.465,44.02-4.265l42.71-73.73l-43.78-74.495l43.78-75.01h86.19c0,0,42.42-73.58,42.43-73.58 C432.91,124.87,417.27,98.46,397.25,76.06z" />
      <polygon style={{ fill: '#BF3131' }} points="270.44,152.49 184.56,152.49 140.78,227.5 184.56,302.51 270.44,302.51 314.22,227.5  " />
      <circle style={{ fill: '#BF3131' }} cx="342.16" cy="286.285" r="7.5" />
      <circle style={{ fill: '#BF3131' }} cx="372.16" cy="316.285" r="7.5" />
      <circle style={{ fill: '#BF3131' }} cx="82.84" cy="138.715" r="7.5" />
    </g>
        </svg>
      ) : (
        <div className="socket">
        <div className="gel center-gel">
            <div className="hex-brick h1"></div>
            <div className="hex-brick h2"></div>
            <div className="hex-brick h3"></div>
        </div>
        {[...Array(37)].map((_, index) => (
            <div key={index} className={`gel c${index + 1} r${index < 6 ? 1 : (index < 15 ? 2 : 3)}`}>
                <div className="hex-brick h1"></div>
                <div className="hex-brick h2"></div>
                <div className="hex-brick h3"></div>
            </div>
        ))}
    </div>
      )}
              <div>
                <h5 className="text-xl text-gray-600 text-center">Global Activities</h5>
                <div className="mt-2 flex justify-center gap-4">
                  <h3 className="text-3xl font-bold text-gray-700">$23,988</h3>
                  <div className="flex items-end gap-1 text-green-500">
                    <svg
                      className="w-3"
                      viewBox="0 0 12 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 0C2.6875 0 0 2.6875 0 6C0 9.3125 2.6875 12 6 12C9.3125 12 12 9.3125 12 6C12 2.6875 9.3125 0 6 0ZM6 10.3125C3.29375 10.3125 1.6875 8.70625 1.6875 6C1.6875 3.29375 3.29375 1.6875 6 1.6875C8.70625 1.6875 10.3125 3.29375 10.3125 6C10.3125 8.70625 8.70625 10.3125 6 10.3125Z"
                        fill="#00B871"
                      />
                    </svg>
                    <span>2%</span>
                  </div>
                </div>
                <span className="block text-center text-gray-500">Compared to last week $13,988</span>
              </div>
              <table className="w-full text-gray-600">
                <tbody>
                  <tr>
                    <td className="py-2">Tailored ui</td>
                    <td className="text-gray-500">896</td>
                    <td>
                      <svg
                        className="w-16 ml-auto"
                        viewBox="0 0 68 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M68 10.5C68 16.0228 66.6728 20.9549 63.7279 25.0451C60.783 29.1354 56.4047 32.0979 51.6274 33.5728C46.8501 35.0477 41.8601 35.9612 37 36.2205"
                          stroke="#6156DE"
                          strokeWidth="3.92307"
                          strokeLinecap="round"
                        />
                        {/* Additional SVG paths */}
                      </svg>
                    </td>
                  </tr>
                  {/* Additional table rows */}
                </tbody>
              </table>
            </div>
          </div>
          <div>
                <div className="h-full py-6 px-6 rounded-xl border border-gray-200 bg-white">
                    <h5 className="text-xl text-gray-700">Downloads</h5>
                    <div className="my-8">
                        <h1 className="text-5xl font-bold text-gray-800">64,5%</h1>
                        <span className="text-gray-500">Compared to last week $13,988</span>
                    </div>
                    <svg className="w-full" viewBox="0 0 218 69" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 67.5C27.8998 67.5 24.6002 15 52.5 15C80.3998 15 77.1002 29 105 29C132.9 29 128.6 52 156.5 52C184.4 52 189.127 63.8158 217.027 63.8158" stroke="url(#paint0_linear_622:13664)" stroke-width="3" stroke-linecap="round"/>
                        <path d="M0 67.5C27.2601 67.5 30.7399 31 58 31C85.2601 31 80.7399 2 108 2C135.26 2 134.74 43 162 43C189.26 43 190.74 63.665 218 63.665" stroke="url(#paint1_linear_622:13664)" stroke-width="3" stroke-linecap="round"/>
                        <defs>
                        <linearGradient id="paint0_linear_622:13664" x1="217.027" y1="15" x2="7.91244" y2="15" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#FF8080"/>
                        <stop offset="1" stop-color="#FF8080"/>
                        </linearGradient>
                        <linearGradient id="paint1_linear_622:13664" x1="218" y1="18.3748" x2="5.4362" y2="18.9795" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#E323FF"/>
                        <stop offset="1" stop-color="#7517F8"/>
                        </linearGradient>
                        </defs>
                    </svg>
                    <table className="mt-6 -mb-2 w-full text-gray-600">
                        <tbody>
                            <tr>
                                <td className="py-2">From new users</td>
                                <td className="text-gray-500">896</td>
                                <td>
                                    <svg className="w-16 ml-auto" viewBox="0 0 68 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect opacity="0.4" width="17" height="21" rx="1" fill="#e4e4f2"/>
                                        <rect opacity="0.4" x="19" width="14" height="21" rx="1" fill="#e4e4f2"/>
                                        <rect opacity="0.4" x="35" width="14" height="21" rx="1" fill="#e4e4f2"/>
                                        <rect opacity="0.4" x="51" width="17" height="21" rx="1" fill="#e4e4f2"/>
                                        <path d="M0 7C8.62687 7 7.61194 16 17.7612 16C27.9104 16 25.3731 9 34 9C42.6269 9 44.5157 5 51.2537 5C57.7936 5 59.3731 14.5 68 14.5" stroke="url(#paint0_linear_622:13631)" stroke-width="2" stroke-linejoin="round"/>
                                        <defs>
                                        <linearGradient id="paint0_linear_622:13631" x1="68" y1="7.74997" x2="1.69701" y2="8.10029" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#E323FF"/>
                                        <stop offset="1" stop-color="#7517F8"/>
                                        </linearGradient>
                                        </defs>
                                    </svg>
                                </td>   
                            </tr>
                            <tr>
                                <td className="py-2">From old users</td>
                                <td className="text-gray-500">1200</td>
                                <td>
                                    <svg className="w-16 ml-auto" viewBox="0 0 68 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect opacity="0.4" width="17" height="21" rx="1" fill="#e4e4f2"/>
                                        <rect opacity="0.4" x="19" width="14" height="21" rx="1" fill="#e4e4f2"/>
                                        <rect opacity="0.4" x="35" width="14" height="21" rx="1" fill="#e4e4f2"/>
                                        <rect opacity="0.4" x="51" width="17" height="21" rx="1" fill="#e4e4f2"/>
                                        <path d="M0 12.929C8.69077 12.929 7.66833 9.47584 17.8928 9.47584C28.1172 9.47584 25.5611 15.9524 34.2519 15.9524C42.9426 15.9524 44.8455 10.929 51.6334 10.929C58.2217 10.929 59.3092 5 68 5" stroke="url(#paint0_linear_622:13640)" stroke-width="2" stroke-linejoin="round"/>
                                        <defs>
                                        <linearGradient id="paint0_linear_622:13640" x1="34" y1="5" x2="34" y2="15.9524" gradientUnits="userSpaceOnUse">
                                        <stop stop-color="#FF8080"/>
                                        <stop offset="1" stop-color="#FF8080"/>
                                        </linearGradient>
                                        </defs>
                                    </svg>
                                </td>   
                            </tr>
                        </tbody>
                    </table>   
                </div>
            </div>
          <div>
            <div className="lg:h-auto py-8 px-6 w-auto flex justify-center   text-gray-600 rounded-xl border border-gray-200 bg-white">
            <div className="">
      <div className="w-56 h-56 bg-neutral-900 shadow-inner shadow-gray-50 flex justify-center items-center rounded-3xl">
        <div className="flex flex-col items-center justify-center rounded-2xl bg-neutral-900 shadow-inner shadow-gray-50 w-52 h-52">
          <div className="before:absolute before:w-12 before:h-12 before:bg-orange-800 before:rounded-full before:blur-xl before:top-16 relative flex flex-col justify-around items-center w-44 h-40 bg-neutral-900 text-gray-50">
            <span className="">{currentDate}</span>
            <span className="z-10 flex items-center text-6xl text-amber-600 [text-shadow:_2px_2px_#fff,_1px_2px_#fff]">{currentTime}</span>
            <div className="text-gray-50 w-48 flex flex-row justify-evenly">
              <span className="text-xs font-bold">89</span>
              <div className="flex flex-row items-center">
                <svg y="0" xmlns="http://www.w3.org/2000/svg" x="0" width="100" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" height="100" className="w-5 h-5 fill-red-500 animate-bounce">
                  <path fillRule="evenodd" d="M23,27.6a15.8,15.8,0,0,1,22.4,0L50,32.2l4.6-4.6A15.8,15.8,0,0,1,77,50L50,77,23,50A15.8,15.8,0,0,1,23,27.6Z" className="" />
                </svg>
                <svg y="0" xmlns="http://www.w3.org/2000/svg" x="0" width="100" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" height="100" className="w-5 h-5 fill-current">
                  <path d="M80.2,40.7l-1.1-2-.2-.3.3-.3c2.2-14.7-21.3-25.6-20.7-21S57,38.1,45.4,31.8c-9.3-5.1-12.9,12.1-22.8,33.7C16.2,79.4,20.8,82.3,27,81l.3.4L29,83.3a1.4,1.4,0,0,0,1.8.5l.9-.3a1.6,1.6,0,0,0,1.1-1.9l-.5-2.5a38.2,38.2,0,0,0,4.5-2.7L38.6,78a1.8,1.8,0,0,0,2.4-.1l1.2-1.1a1.9,1.9,0,0,0,.4-1.9l-1-2.5L45.5,69l1.7,1.6a1.8,1.8,0,0,0,2.4-.1l.9-1a1.7,1.7,0,0,0,.4-1.8L50,65c5.6-5,11.9-10.9,17.3-15.8l.4.2,1.9,1.1a1.6,1.6,0,0,0,2.1-.2l.8-.8a1.6,1.6,0,0,0,.3-2.1l-1.3-2.1,3.2-3.1,2.2,1.5a1.8,1.8,0,0,0,2.2-.1l.8-.8A1.7,1.7,0,0,0,80.2,40.7Z" className="svg-fill-primary" />
                </svg>
                <svg y="0" xmlns="http://www.w3.org/2000/svg" x="0" width="100" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" height="100" className="w-5 h-5 fill-current">
                  <path fillRule="evenodd" d="M59.5,20.5a3.9,3.9,0,0,0-2.5-2,4.3,4.3,0,0,0-3.3.5,11.9,11.9,0,0,0-3.2,3.5,26,26,0,0,0-2.3,4.4,76.2,76.2,0,0,0-3.3,10.8,120.4,120.4,0,0,0-2.4,14.2,11.4,11.4,0,0,1-3.8-4.2c-1.3-2.7-1.5-6.1-1.5-10.5a4,4,0,0,0-2.5-3.7,3.8,3.8,0,0,0-4.3.9,27.7,27.7,0,1,0,39.2,0,62.4,62.4,0,0,1-5.3-5.8A42.9,42.9,0,0,1,59.5,20.5ZM58.4,70.3a11.9,11.9,0,0,1-20.3-8.4s3.5,2,9.9,2c0-4,2-15.9,5-17.9a21.7,21.7,0,0,0,5.4,7.5,11.8,11.8,0,0,1,3.5,8.4A12,12,0,0,1,58.4,70.3Z" className="svg-fill-primary" />
                </svg>
              </div>
            </div>
          </div>
          <span className="text-gray-700 text-lg font-light">fitbit</span>
        </div>
      </div>
    </div>
    
            </div>
          </div>
        </div>
      </div>
    );
}

export default Cards;
