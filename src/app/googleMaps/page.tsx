"use client"
import dynamic from "next/dynamic";
import { useState } from 'react';
import CategoryList from '@/app/googleMaps/components/CategoryList';
import RangeSelect from '@/app/googleMaps/components/RangeSelect';
import Search from "./components/search";

const DynamicMapComponent = dynamic(() => import("./components/MapComponent"), { ssr: false });

const MyPage = () => {
  const [radius, setRadius] = useState(60);
  const [category, setCategory] = useState<string | null>(null); // Initialize category state with null

  return (
    <div className='grid grid-cols-1 md:grid-cols-4'>
      <div className='p-3 '>
        {/* Pass the onCategoryChange callback to CategoryList */}
        <CategoryList onCategoryChange={(value) => setCategory(value)} />
        <RangeSelect onRadiusChange={(value) => setRadius(value)} />
        <div className="mt-6">
          <Search />
        </div>
      </div>
      <div className='col-span-3'>
        {/* Pass the selected category and radius to MapComponent */}
        <DynamicMapComponent radius={radius} category={category} />
      </div>
    </div>
  );
};

export default MyPage;
