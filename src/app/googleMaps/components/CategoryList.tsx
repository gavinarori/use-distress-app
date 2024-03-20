import React, { useState, useEffect } from 'react';

interface CategoryItem {
    name: string;
    value: string;
}

interface CategoryListProps {
    onCategoryChange: (category: string | null) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ onCategoryChange }) => {
    const [categoryList, setCategoryList] = useState<CategoryItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        const fetchCrimeTypes = async () => {
            try {
                const response = await fetch('https://maps2.dcgis.dc.gov/dcgis/rest/services/FEEDS/MPD/MapServer/8/query?where=1%3D1&outFields=OFFENSE,WARD,SHIFT&f=json');
                const data = await response.json();
                if (data && data.features) {
                    const types: string[] = data.features.map((feature: any) => feature.attributes.OFFENSE);
                    // Deduplicate and sort crime types
                    const uniqueTypes = Array.from(new Set(types)).sort();
                    const categoryItems: CategoryItem[] = uniqueTypes.map((type: string) => ({ name: type, value: type }));
                    setCategoryList(categoryItems);
                }
            } catch (error) {
                console.error('Error fetching crime types:', error);
            }
        };

        fetchCrimeTypes();
    }, []);

    return (
        <div>
            <h2 className='font-bold px-2'>
                Select crime Type
            </h2>
            <div className='grid 
            grid-cols-2 
            md:grid-cols-2 
            lg:grid-cols-3'>
                {categoryList.map((item: CategoryItem, index: number) => ( 
                    <button key={index} className={`flex flex-col
                    justify-center items-center bg-[#FF8080]
                    p-2 m-2 rounded-lg  
                    hover:grayscale-0 cursor-pointer
                    text-[13px]
                    border-purple-400
                    ${selectedCategory === item.value ? 'bg-[#FF8080] border-[1px]' : null}`}
                        onClick={() => {
                            setSelectedCategory(item.value);
                            onCategoryChange(item.value);
                        }}>
                            <p className='text-white'>{item.name}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryList;
