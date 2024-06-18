"use client"
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import Sidebar from '@/components/Sidebar/page';
import { Navbar } from '@/components/navbar/page';
import Cards from '@/components/cards/page';
import GoogleMaps from '@/app/GoogleMaps/page'
import Analytics from '@/app/analytics/page'
import Insights from './Insights/page';
import { useSignInModal } from '@/components/modals/cancel';

function Home() {
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [currentView, setCurrentView] = useState('cards');
  const router = useRouter();
  const { data: session, status }: any = useSession();
  const { toast } = useToast();
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const [isSignalSent, setIsSignalSent] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Memoize the user location to prevent unnecessary re-renders
  const memoizedUserLocation = useMemo(() => userLocation, [userLocation]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() =>{
  if (!session) {
    router.push("/login")
    }
},[session , router]);

  useEffect(() => {
    let watchId: any;
  
    const errorLocation = (error: GeolocationPositionError) => {
      setError(error.message);
      if (error.code === GeolocationPositionError.PERMISSION_DENIED) {
        setShowPermissionModal(true);
      }
    };
  
    if ('geolocation' in navigator) {
      watchId = navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position);
        },
        errorLocation
      );
  
      // No need to watch for continuous updates after fetching once
      // watchId = navigator.geolocation.watchPosition(updateLocation, errorLocation);
    } else {
      setError('Geolocation is not available in this browser.');
    }
  
    // Clean up the watchPosition when the component unmounts
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
      return undefined; // Explicitly return undefined to satisfy TypeScript
    };
  }, []);

  useEffect(() => {
    if (isSignalSent) {
      setShowSignInModal(true);
    }
  }, [isSignalSent, setShowSignInModal]);

  const sendData = async () => {
    try {
      const response = await axios.post('/api/signal', {
        latitude: memoizedUserLocation?.coords.latitude,
        longitude: memoizedUserLocation?.coords.longitude,
        accuracy: memoizedUserLocation?.coords.accuracy,
        timestamp: memoizedUserLocation?.timestamp,
      });

      if (response.status === 201) {
        console.log('Signal sent successfully');
        setIsSignalSent(true);
        toast({
          description: 'Distress Signal sent successfully',
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

  const handleSVGClick = () => {
    sendData();
  };

  const renderContent = () => {
    switch (currentView) {
      case 'cards':
        return <Cards onSVGClick={handleSVGClick} setShowSignInModal={setShowSignInModal} />;
      case 'googlemaps':
        return <GoogleMaps />;
      case 'insights':
        return <Insights />;
      case 'analytics':
        return <Analytics />;
      default:
        return <Cards onSVGClick={handleSVGClick} />;
    }
  };

  return (
    <main className="">
      <Sidebar isOpen={isSidebarOpen} setCurrentView={setCurrentView} />
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      {renderContent()}
      <SignInModal />
    </main>
  )
}

export default Home;
