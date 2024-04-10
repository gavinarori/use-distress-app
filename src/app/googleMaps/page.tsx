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
  const [locations, setLocations] = useState([]);



  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("/api/signal/get");
        const data = await response.json();
        setLocations(data);
        console.log(data) 
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
        <DynamicMapComponent  radius={radius} category={category} />
      </div>
    </div>
  );
};

export default MyPage;
