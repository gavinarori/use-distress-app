"use client"
import axios from 'axios';
import { useEffect,  useState } from 'react';
import { useSession} from 'next-auth/react';
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"



function Home() {
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [showSVG, setShowSVG] = useState(true);
  const router = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast()

  useEffect(() => {
    
    let watchId: number | undefined;
   
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('User Location:', position.coords.latitude, position.coords.longitude);
          setUserLocation(position);
        },
        (GeolocationPositionError) => {
          setError(GeolocationPositionError.message);
          if (GeolocationPositionError.code === GeolocationPositionError.PERMISSION_DENIED) {
            setShowPermissionModal(true);
          }
        }
      );

      watchId = navigator.geolocation.watchPosition(
        (position) => {
          setUserLocation(position);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError('Geolocation is not available in this browser.');
    }

    // Clean up the watchPosition when the component unmounts
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  const handlePermissionButtonClick = () => {
    setShowPermissionModal(false);
  };
  
  const handleClick = () => {
    setShowSVG(!showSVG);
    
  };

  const sendData = async () => {
    try {
      const response = await fetch('/api/signal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Latitude: userLocation?.coords?.latitude,
          Longitude: userLocation?.coords?.longitude,
          accuracy: userLocation?.coords?.accuracy,
          timestamp: userLocation?.timestamp,
          userId: session?.user,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Response:', data);
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
        description: 'Failed to send signal:',
      });
    }
  };
  
  const closeModal = () => {
    const modal = document.getElementById('my-modal');
    if (modal) {
      modal.classList.add('hidden');
    }
  };





  return (
      <main className="flex min-h-screen flex-col items-center   justify-between p-24">
        {showPermissionModal && (
           <div className="fixed z-10 inset-0 overflow-y-auto" id="my-modal">
           <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
             <div className="fixed inset-0 transition-opacity" aria-hidden="true">
               <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
             </div>
             <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
             <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
               role="dialog" aria-modal="true" aria-labelledby="modal-headline">
               <div>
                 <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                   <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" aria-hidden="true">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                       d="M6 18L18 6M6 6l12 12" />
                   </svg>
                 </div>
                 <div className="mt-3 text-center sm:mt-5">
                   <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                     Error
                   </h3>
                   <div className="mt-2">
                     <p className="text-sm text-gray-500">
                       There was an error processing your request.
                     </p>
                   </div>
                 </div>
               </div>
               <div className="mt-5 sm:mt-6">
                 <button
                   className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm"
                   onClick={closeModal}>
                   OK
                 </button>
               </div>
             </div>
           </div>
         </div>
        )}
          <div className=" dark:bg-gray-800 flex justify-center items-center w-screen h-screen p-5 ">
          {showSVG ? (
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
          width="500"
          height="500"
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
        <iframe
          src="https://lottie.host/embed/427c5f4f-4e37-491a-8085-d71651fa614c/ixlmjMRVH0.json"
          width="512"
          height="512"
          frameBorder="0"
          allowFullScreen
          onClick={handleClick}
        />
      )}
</div>
<Carousel className="w-full max-w-xs">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
      </main>
  )
      }
      export default Home