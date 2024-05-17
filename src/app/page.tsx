"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import './loader.css'
import Sidebar from '@/components/Sidebar/page';
import { Navbar } from '@/components/navbar/page';
import Cards from '@/components/cards/page';
import { useSignInModal } from '@/components/modals/cancel';

function Home() {
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [showSVG, setShowSVG] = useState(true);
  const router = useRouter();
  const { data: session, status }: any = useSession();
  const { toast } = useToast();
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const [isSignalSent, setIsSignalSent] = useState(false);

  useEffect(() => {
    if (!session) {
      router.push("/login")
    }

    let watchId: number | undefined;

    const updateLocation = (position: GeolocationPosition) => {
      setUserLocation(position);
    };

    const errorLocation = (error: GeolocationPositionError) => {
      setError(error.message);
      if (error.code === GeolocationPositionError.PERMISSION_DENIED) {
        setShowPermissionModal(true);
      }
    };

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(updateLocation, errorLocation);

      watchId = navigator.geolocation.watchPosition(updateLocation, errorLocation);
    } else {
      setError('Geolocation is not available in this browser.');
    }

    // Clean up the watchPosition when the component unmounts
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [session, router]); // Include session and router in the dependency array

  useEffect(() => {
    if (isSignalSent) {
      setShowSignInModal(true);
    }
  }, [isSignalSent, setShowSignInModal]);

  const sendData = async () => {
    try {
      const response = await axios.post('/api/signal', {
        latitude: userLocation?.coords.latitude,
        longitude: userLocation?.coords.longitude,
        accuracy: userLocation?.coords.accuracy,
        timestamp: userLocation?.timestamp,
      });

      if (response.status === 201) {
        console.log('Signal sent successfully');
        setIsSignalSent(true);
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
    }
  };

  const handlePermissionButtonClick = () => {
    setShowPermissionModal(false);
  };

  const handleSVGClick = () => {
    sendData();
  };

  const closeModal = () => {
    const modal = document.getElementById('my-modal');
    if (modal) {
      modal.classList.add('hidden');
    }
  };

  return (
    <main className=''>
      <Sidebar />
      <Navbar />
      <Cards onSVGClick={handleSVGClick} />
      <SignInModal />
    </main>
  )
}

export default Home;
