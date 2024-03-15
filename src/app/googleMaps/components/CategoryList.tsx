import React, { useState } from 'react';
import Data from './Data';
import Image from 'next/image';

interface CategoryItem {
    name: string;
    value: string;
}

interface CategoryListProps {
    onCategoryChange: (category: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ onCategoryChange }) => {
    const [categoryList, setCategoryList] = useState<CategoryItem[]>(Data.CategoryListData);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

    return (
        <div>
            <h2 className='font-bold px-2'>
                Select crime Type
            </h2>
            <div className='grid 
            grid-cols-2 
            md:grid-cols-2 
            lg:grid-cols-3'>
                {categoryList.map((item: CategoryItem, index: number) => ( // Specify the type of item as CategoryItem
                    <div key={index} className={`flex flex-col
                    justify-center items-center bg-[#FF8080]
                    p-2 m-2 rounded-lg  
                    hover:grayscale-0 cursor-pointer
                    text-[13px]
                    border-purple-400
                    ${selectedCategory === index ? 'bg-[#FF8080] border-[1px]' : null}`}
                        onClick={() => {
                            setSelectedCategory(index);
                            onCategoryChange(item.value);
                        }}>
                            <p className='text-white'>{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;
