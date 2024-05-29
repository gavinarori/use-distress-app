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
import axios from 'axios'
import { useToast } from "@/components/ui/use-toast"
import './loading.css'


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

function Cards({ onSVGClick , setShowSignInModal }:any) {
  const [currentDate, setCurrentDate] = useState<string>('');
  const [currentTime, setCurrentTime] = useState<string>('');
  const [showSVG, setShowSVG] = useState(true);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignalSent, setIsSignalSent] = useState(false);
  const { toast } = useToast();
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(null);

  useEffect(() => {
    
  }, []);
 

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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position);
        },
        (error) => {
          console.error('Error getting location', error);
          toast({
            variant: 'destructive',
            description: 'Failed to get user location',
          });
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, [toast]);
  

  const EmergencytypeData = async (url: string) => {
    if (!userLocation) {
      toast({
        variant: 'destructive',
        description: 'User location not available',
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(url, {
        latitude: userLocation?.coords.latitude,
        longitude: userLocation?.coords.longitude,
        accuracy: userLocation?.coords.accuracy,
        timestamp: userLocation?.timestamp,
      });

      if (response.status === 201) {
        console.log('Signal sent successfully');
        setIsSignalSent(true);
        setShowSignInModal(true);
        toast({
          description: 'Signal sent successfully',
        });
      } else {
        console.warn(response.status);
        toast({
          variant: 'destructive',
          description: 'Unexpected status code',
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        description: 'Failed to send signal',
      });
    } finally {
      setIsLoading(false);
    }
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
                <h5 className="text-xl text-gray-600 text-center">tap to Distress</h5>
                <div className="mt-2 flex justify-center gap-4"></div>
                <span className="block text-center text-gray-500 mt-3">Easily access instant relief with a single tap.</span>
              </div>
            </div>
          </div>

          <div>
                <div className="h-full py-6 px-6 rounded-xl border border-gray-200 bg-white">
                    <h5 className="text-xl text-gray-700">choose your emergency</h5>
                    <div className="my-8">
                        <span className="text-gray-500">Compared to last week $13,988</span>
                    </div>

                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
                    {isLoading && <div className='flex justify-center items-center'>		<svg className="pl" viewBox="0 0 160 160" width="160px" height="160px" xmlns="http://www.w3.org/2000/svg">
			<defs>
				<linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
					<stop offset="0%" stop-color="#000"></stop>
					<stop offset="100%" stop-color="#fff"></stop>
				</linearGradient>
				<mask id="mask1">
					<rect x="0" y="0" width="160" height="160" fill="url(#grad)"></rect>
				</mask>
				<mask id="mask2">
					<rect x="28" y="28" width="104" height="104" fill="url(#grad)"></rect>
				</mask>
			</defs>
			
			<g>
				<g className="pl__ring-rotate">
					<circle className="pl__ring-stroke" cx="80" cy="80" r="72" fill="none" stroke="hsl(223,90%,55%)" strokeWidth="16" strokeDasharray="452.39 452.39" strokeDashoffset="452" strokeLinecap="round" transform="rotate(-45,80,80)"></circle>
				</g>
			</g>
			<g mask="url(#mask1)">
				<g className="pl__ring-rotate">
					<circle className="pl__ring-stroke" cx="80" cy="80" r="72" fill="none" stroke="hsl(193,90%,55%)" strokeWidth="16" strokeDasharray="452.39 452.39" strokeDashoffset="452" strokeLinecap="round" transform="rotate(-45,80,80)"></circle>
				</g>
			</g>
			
			<g>
				<g stroke-width="4" strokeDasharray="12 12" strokeDashoffset="12" strokeLinecap="round" transform="translate(80,80)">
					<polyline className="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(-135,0,0) translate(0,40)"></polyline>
					<polyline className="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(-90,0,0) translate(0,40)"></polyline>
					<polyline className="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(-45,0,0) translate(0,40)"></polyline>
					<polyline className="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(0,0,0) translate(0,40)"></polyline>
					<polyline className="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(45,0,0) translate(0,40)"></polyline>
					<polyline className="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(90,0,0) translate(0,40)"></polyline>
					<polyline className="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(135,0,0) translate(0,40)"></polyline>
					<polyline className="pl__tick" stroke="hsl(223,10%,90%)" points="0,2 0,14" transform="rotate(180,0,0) translate(0,40)"></polyline>
				</g>
			</g>
			<g mask="url(#mask1)">
				<g stroke-width="4" strokeDasharray="12 12" strokeDashoffset="12" strokeLinecap="round" transform="translate(80,80)">
					<polyline className="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(-135,0,0) translate(0,40)"></polyline>
					<polyline className="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(-90,0,0) translate(0,40)"></polyline>
					<polyline className="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(-45,0,0) translate(0,40)"></polyline>
					<polyline className="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(0,0,0) translate(0,40)"></polyline>
					<polyline className="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(45,0,0) translate(0,40)"></polyline>
					<polyline className="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(90,0,0) translate(0,40)"></polyline>
					<polyline className="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(135,0,0) translate(0,40)"></polyline>
					<polyline className="pl__tick" stroke="hsl(223,90%,80%)" points="0,2 0,14" transform="rotate(180,0,0) translate(0,40)"></polyline>
				</g>
			</g>
			
			<g>
				<g transform="translate(64,28)">
					<g className="pl__arrows" transform="rotate(45,16,52)">
						<path fill="hsl(3,90%,55%)" d="M17.998,1.506l13.892,43.594c.455,1.426-.56,2.899-1.998,2.899H2.108c-1.437,0-2.452-1.473-1.998-2.899L14.002,1.506c.64-2.008,3.356-2.008,3.996,0Z"></path>
						<path fill="hsl(223,10%,90%)" d="M14.009,102.499L.109,58.889c-.453-1.421,.559-2.889,1.991-2.889H29.899c1.433,0,2.444,1.468,1.991,2.889l-13.899,43.61c-.638,2.001-3.345,2.001-3.983,0Z"></path>
					</g>
				</g>
			</g>
			<g mask="url(#mask2)">
				<g transform="translate(64,28)">
					<g className="pl__arrows" transform="rotate(45,16,52)">
						<path fill="hsl(333,90%,55%)" d="M17.998,1.506l13.892,43.594c.455,1.426-.56,2.899-1.998,2.899H2.108c-1.437,0-2.452-1.473-1.998-2.899L14.002,1.506c.64-2.008,3.356-2.008,3.996,0Z"></path>
						<path fill="hsl(223,90%,80%)" d="M14.009,102.499L.109,58.889c-.453-1.421,.559-2.889,1.991-2.889H29.899c1.433,0,2.444,1.468,1.991,2.889l-13.899,43.61c-.638,2.001-3.345,2.001-3.983,0Z"></path>
					</g>
				</g>
			</g>
		</svg></div>}
  <button
    onClick={() => EmergencytypeData('/api/emergencytypes/firstaid')}
    className="flex items-center rounded-full border border-indigo-600 bg-[#FF8080] p-3 ml-2 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
    disabled={isLoading}
  >
    <img src="/first-aid-kit-svgrepo-com.svg" className='h-10 w-10' alt="First Aid Kit" />
    <span className="ml-4 lg:hidden md:hidden sm:inline">First Aid</span>
  </button>
  <button
    onClick={() => EmergencytypeData('/api/emergencytypes/ambulance')}
    className="flex items-center  rounded-full border border-indigo-600 bg-[#FF8080] p-3 ml-2 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
    disabled={isLoading}
  >
    <img src="/ambulance-svgrepo-com.svg" className='w-10 h-10' alt="Ambulance" />
    <span className="ml-2 lg:hidden md:hidden sm:inline">Ambulance</span>
  </button>
  <button
  onClick={() => EmergencytypeData('/api/emergencytypes/firebrigade')}
    className="flex items-center  rounded-full border border-indigo-600 bg-[#FF8080] p-3 ml-2 text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
    disabled={isLoading}
  >
    <img src="/fire-svgrepo-com.svg" className='w-10 h-10' alt="Fire" />
    <span className="ml-2 lg:hidden md:hidden sm:inline">Fire brigade</span>
  </button>
</div>

                </div>
            </div>
          <div>
          <Card>
      <CardHeader>
        <CardTitle>Distress Monitor</CardTitle>
        <CardDescription>
        Monitor distress levels over time in global scope.
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
          <TableHead>Checked</TableHead>
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
