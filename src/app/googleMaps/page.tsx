"use client";
import dynamic from "next/dynamic";
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import CategoryList from '@/app/googleMaps/components/CategoryList';
import RangeSelect from '@/app/googleMaps/components/RangeSelect';
import Search from "./components/search";
const DynamicMapComponent = dynamic(() => import("./components/MapComponent"), { ssr: false });

const MyPage = () => {
  const [radius,setRadius]= useState(60);
  const [category,setCategory]=useState();
  return (
    <div className='grid grid-cols-1 md:grid-cols-4'>
      <div className='p-3 '>
        <CategoryList onCategoryChange={(value)=>setCategory(value)}/>
        <RangeSelect onRadiusChange={(value)=>setRadius(value)} />
        <div className="mt-6">
        <Search  />
        </div>
      </div>
      <div className='col-span-3'>
      <DynamicMapComponent radius={radius}  />
      </div>
    </div>

  );
};

export default MyPage;