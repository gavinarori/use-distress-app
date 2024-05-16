"use client"
import React, { useEffect, useState } from 'react';
import Snaky from './Snaky';
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"


const Insights: React.FC = () => {
    const [insights, setInsights] = useState<{ name: string, description: string }[]>([]);
    

  useEffect(() => {
    const categories: string[] = ['HOMICIDE', 'THEFT/OTHER', 'ROBBERY', 'MOTOR VEHICLE THEFT', 'ASSAULT W/DANGEROUS WEAPON', 'BURGLARY', 'THEFT F/AUTO'];

    const fetchCrimeData = async (): Promise<void> => {
      try {
        const response = await fetch(
          'https://maps2.dcgis.dc.gov/dcgis/rest/services/FEEDS/MPD/MapServer/8/query?where=1%3D1&outFields=OFFENSE,WARD,SHIFT&f=json'
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        //console.log(data);
        if (data && data.features) {
          const filteredData = data.features.filter((feature: any) => categories.includes(feature.attributes.OFFENSE));
          generateInsights(filteredData);
        } else {
          throw new Error('Invalid data structure received from the API');
        }
      } catch (error) {
        console.error('Error fetching crime data:', error);
      }
    };

    const generateInsights = (data: any[]): void => {
      const offenseCounts: Record<string, number> = categories.reduce((counts: Record<string, number>, category: string) => {
        counts[category] = data.filter((feature: any) => feature.attributes.OFFENSE === category).length;
        return counts;
      }, {});

      const newInsights = categories.map((category: string) => {
        const currentCount = offenseCounts[category];
        const previousCount = 50;
        const hasIncreased = currentCount > previousCount;
        const insight = hasIncreased ? `The number of ${category} offenses has increased in the last 30 days.` : `The number of ${category} offenses has not increased in the last 30 days.`;

        let preventiveMeasure = '';
        switch (category) {
          case 'HOMICIDE':
            preventiveMeasure = 'Stay aware of your surroundings and avoid dangerous areas, especially at night.';
            break;
          case 'THEFT/OTHER':
            preventiveMeasure = 'Keep valuables secure and out of sight, and be cautious of pickpockets in crowded areas.';
            break;
          case 'BURGLARY':
            preventiveMeasure = 'Keep valuables secure and out of sight, and be cautious of pickpockets in crowded areas.';
            break;
          case 'MOTOR VEHICLE THEFT':
            preventiveMeasure = 'Keep valuables secure and out of sight, and be cautious of pickpockets in crowded areas.';
            break;
          case 'ASSAULT W/DANGEROUS WEAPON':
            preventiveMeasure = 'Keep valuables secure and out of sight, and be cautious of pickpockets in crowded areas.';
            break;
          case 'THEFT F/AUTO':
            preventiveMeasure = 'Keep valuables secure and out of sight, and be cautious of pickpockets in crowded areas.';
            break;
          case 'ROBBERY':
            preventiveMeasure = 'Keep valuables secure and out of sight, and be cautious of pickpockets in crowded areas.';
            break;
          default:
            preventiveMeasure = 'Take appropriate precautions to minimize the risk of becoming a victim of this type of offense.';
        }

        return {
          name: insight,
          description: preventiveMeasure,
        };
      });

      setInsights(newInsights);
    };

    fetchCrimeData();
  }, []); 

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Insights from Crime Data Analysis</h2>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {insights.map((insight, index) => (
              <div key={index} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#ef5a5a] text-white">
                    {index + 1}
                  </div>
                  {insight.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{insight.description}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Drawer>
      <DrawerTrigger asChild>
        <div className='flex items-center space-x-4 justify-center mt-11'>
        <button type="button" className="py-2 px-4 max-w-md  flex justify-center items-center bg-[#ef5a5a] text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg">
  see preview
</button>
        </div>

      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto max-w-7xl w-full">
        <DrawerHeader>
            <DrawerTitle>Sankey Chart</DrawerTitle>
            <DrawerDescription>This chart visualizes the flow of offenses categorized by Counts.</DrawerDescription>
          </DrawerHeader>
          <Snaky />
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
      </div>
    </div>
  );
};

export default Insights;