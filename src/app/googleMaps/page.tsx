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
          const data = await response.json();
          
          if (!data || !Array.isArray(data.getCurrentLocation)) {
            throw new Error("Invalid data format: getCurrentLocation array not found");
          }
          
          const locationsArray = data.getCurrentLocation.map((location: { latitude: any; longitude: any; }) => ({
            latitude: location.latitude,
            longitude: location.longitude,
            title: "Location" 
          }));
          setLocations(locationsArray);
          console.log("Locations:", locationsArray);
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
