"use client"
import dynamic from "next/dynamic";
import { useState, useEffect } from 'react';
import CategoryList from '@/app/googleMaps/components/CategoryList';
import RangeSelect from '@/app/googleMaps/components/RangeSelect';
import Search from "./components/search";

const DynamicMapComponent = dynamic(() => import("./components/MapComponent"), { ssr: false });

const MyPage = () => {
  const [radius, setRadius] = useState(60);
  const [category, setCategory] = useState<string | null>(null);
  const [locations, setLocations] = useState<any>([]);



    useEffect(() => {
      const fetchLocations = async () => {
        try {
          const response = await fetch("/api/signal/get");
          if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
          }
          const { message, lastLocation } = await response.json();
      
          if (message !== "success" || !lastLocation) {
            throw new Error("Invalid data format: 'success' message not found or lastLocation not found");
          }
      
          // Format the last location data as needed
          const locationData = {
            latitude: lastLocation.latitude,
            longitude: lastLocation.longitude,
            isCanceled: lastLocation.isCanceled || false,
            isChecked: lastLocation.isChecked || false,
            title: "Location"
          };
      
          setLocations([locationData]);
          console.log("Last Location:", locationData);
        } catch (error) {
          console.error("Error fetching locations:", error);
        }
      };
      
    
      fetchLocations();
    }, []);
    
  return (
    <div className='grid grid-cols-1 md:grid-cols-4'>
      <div className='p-3 '>
        <CategoryList onCategoryChange={(value) => setCategory(value)} />
        <RangeSelect onRadiusChange={(value) => setRadius(value)} />
        <div className="mt-6">
          <Search />
        </div>
      </div>
      <div className='col-span-3'>
        <DynamicMapComponent  radius={radius} category={category} locations={locations} />
      </div>
    </div>
  );
};

export default MyPage;
