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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts"
import Svg from '@/app/icons/svg';


interface Location {
  id: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: string;
}
const data = [
  {
    average: 400,
    today: 240,
  },
  {
    average: 300,
    today: 139,
  },
  {
    average: 200,
    today: 980,
  },
  {
    average: 278,
    today: 390,
  },
  {
    average: 189,
    today: 480,
  },
  {
    average: 239,
    today: 380,
  },
  {
    average: 349,
    today: 430,
  },
]

function Cards({ onSVGClick }:any) {
  const [currentDate, setCurrentDate] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [showSVG, setShowSVG] = useState(true);
  const [locations, setLocations] = useState<Location[]>([]);
 

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

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("/api/many");
        const data = await response.json();
        console.log(data)
        // Check if the data object contains the getCurrentLocation key
        if (data.hasOwnProperty('getCurrentLocation')) {
          const fetchedLocations = data.getCurrentLocation;
          if (Array.isArray(fetchedLocations)) {
            setLocations(fetchedLocations);
          } else {
            console.error("getCurrentLocation data is not an array:", fetchedLocations);
          }
        } else {
          console.error("Data does not contain getCurrentLocation key:", data);
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };
  
    fetchLocations();
  }, []);
  
    return (
        <div className="  flex justify-center item-center lg:ml-[290px]  pt-6 ">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
          <div className="md:col-span-1 lg:col-span-1">
            <div className="h-full w-auto py-8 px-6 space-y-6 rounded-xl border border-gray-200 bg-white">
            {showSVG  ? (
              <div className='flex justify-center'>
                <svg
          className='cursor-pointer h-[200px] w-[200px]'
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
              </div>
        
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
          <Card>
      <CardHeader>
        <CardTitle>Exercise Minutes</CardTitle>
        <CardDescription>
          Your exercise minutes are ahead of where you normally are.
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Average
                            </span>
                            <span className="font-bold text-muted-foreground">
                              {payload[0].value}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[0.70rem] uppercase text-muted-foreground">
                              Today
                            </span>
                            <span className="font-bold">
                              {payload[1].value}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  }

                  return null;
                }}
              />
              <Line
                type="monotone"
                strokeWidth={2}
                dataKey="average"
                activeDot={{
                  r: 6,
                  style: { fill: "rgb(225 29 72)", opacity: 0.25 },
                }}
                style={
                  {
                    stroke: "rgb(225 29 72)",
                    opacity: 0.25,
                  } as React.CSSProperties
                }
              />
              <Line
                type="monotone"
                dataKey="today"
                strokeWidth={2}
                activeDot={{
                  r: 8,
                  style: { fill: "rgb(225 29 72)" },
                }}
                style={
                  {
                    stroke: "rgb(225 29 72)",
                  } as React.CSSProperties
                }
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
          </div>

          <Card className="xl:col-span-2 gap-2" x-chunk="dashboard-01-chunk-4">
  <CardHeader className="flex flex-row items-center">
    <div className="grid gap-2">
      <CardTitle>Your Distress history</CardTitle>
      <CardDescription>
        Recent Distress from your account.
      </CardDescription>
    </div>
  </CardHeader>
  <CardContent>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Accuracy</TableHead>
          <TableHead>Timestamp</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
  {locations.length === 0 ? (
    <TableRow>
      <TableCell colSpan={3}>{/*
    Graphic from https://www.opendoodles.com/
*/}

<div className="grid h-auto place-content-center  ">
  <div className="text-center">
    <Svg/>
    <h1 className="mt-6 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">Uh-oh!</h1>
    <p className="mt-4 text-gray-500">No data available.</p>
  </div>
</div></TableCell>
    </TableRow>
  ) : (
    locations.map((location) => (
      <TableRow key={location.id}>
        <TableCell>{location.id}</TableCell>
        <TableCell>{location.accuracy}</TableCell>
        <TableCell>{new Date(location.timestamp).toLocaleString('en-US', { timeZone: 'EAT' })}</TableCell>
      </TableRow>
    ))
  )}
</TableBody>

    </Table>
  </CardContent>
</Card>

        </div>
      </div>
    );
}

export default Cards;
