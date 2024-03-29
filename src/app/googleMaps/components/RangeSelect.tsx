import React, { useState } from 'react';

interface RangeSelectProps {
    onRadiusChange: (radius: number) => void;
}

function RangeSelect({ onRadiusChange }: RangeSelectProps) {
    const [radius, setRadius] = useState<number>(30);

    return (
        <div className='mt-5 px-2'>
            <h2 className='font-bold'>Select Radius </h2>
            <input
                type='range'
                className='w-full h-2 bg-[#FF8080] rounded-lg appearance-none cursor-pointer'
                min="30"
                max="100"
                step="10"
                onChange={(e) => { 
                    const newRadius = parseInt(e.target.value);
                    setRadius(newRadius);
                    onRadiusChange(newRadius);
                }}
                defaultValue={radius}
            />
            <label className='text-gray-500 text-[15px]'>{radius} in Meter</label>
        </div>
    );
}

export default RangeSelect;
