"use client"
import React, { useEffect, useState } from 'react';
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

import { 
    Layer,
    Rectangle,
    ResponsiveContainer,
    Sankey,
    Text,
    Tooltip, } from "recharts"



    const data0 = {
        nodes: [
          { name: "Income" },
          { name: "Spending" },
          { name: "Savings" },
          { name: "Home" },
          { name: "Car & Transportation" },
          { name: "Food & Drinks" },
          { name: "Shopping" },
          { name: "Entertainment" },
          { name: "Subscriptions" },
          { name: "Other" },
          { name: "Stock" },
          { name: "Crypto" },
          { name: "ETF" },
        ],
        links: [
          // Flow from Income
          { source: 0, target: 1, value: 10000 }, // Income to Spending (example value)
          { source: 0, target: 2, value: 5000 }, // Income to Savings (example value)
      
          // Flow from Spending to categories
          { source: 1, target: 3, value: 3000 }, // Spending to Home
          { source: 1, target: 4, value: 2000 }, // Spending to Car & Transportation
          { source: 1, target: 5, value: 1500 }, // Spending to Food & Drinks
          { source: 1, target: 6, value: 800 }, // Spending to Shopping
          { source: 1, target: 7, value: 1200 }, // Spending to Entertainment
          { source: 1, target: 8, value: 400 }, // Spending to Subscriptions
          { source: 1, target: 9, value: 1000 }, // Spending to Other
      
          // Flow from Savings to investment types
          { source: 2, target: 10, value: 2000 }, // Savings to Stock
          { source: 2, target: 11, value: 1000 }, // Savings to Crypto
          { source: 2, target: 12, value: 2000 }, // Savings to ETF
        ],
      };
      
      interface CustomLinkProps {
        sourceX: number;
        targetX: number;
        sourceY: number;
        targetY: number;
        sourceControlX: number;
        targetControlX: number;
        linkWidth: number;
        index: number;
      }
      
      class CustomLink extends React.Component<CustomLinkProps, { fill: string }> {
        state = {
          fill: "url(#linkGradient)",
        };
      
        render() {
          const {
            sourceX,
            targetX,
            sourceY,
            targetY,
            sourceControlX,
            targetControlX,
            linkWidth,
            index,
          } = this.props;
          const { fill } = this.state;
      
          return (
            <Layer key={`CustomLink${index}`}>
              <path
                d={`
                  M${sourceX},${sourceY + linkWidth / 2}
                  C${sourceControlX},${sourceY + linkWidth / 2}
                    ${targetControlX},${targetY + linkWidth / 2}
                    ${targetX},${targetY + linkWidth / 2}
                  L${targetX},${targetY - linkWidth / 2}
                  C${targetControlX},${targetY - linkWidth / 2}
                    ${sourceControlX},${sourceY - linkWidth / 2}
                    ${sourceX},${sourceY - linkWidth / 2}
                  Z
                `}
                fill={fill}
                strokeWidth="0"
                onMouseEnter={() => {
                  this.setState({ fill: "rgba(0, 136, 254, 0.5)" });
                }}
                onMouseLeave={() => {
                  this.setState({ fill: "url(#linkGradient)" });
                }}
              />
            </Layer>
          );
        }
      }
      
      interface CustomNodeProps {
        x: number;
        y: number;
        width: number;
        height: number;
        index: number;
        payload: { name: string; value: number };
        containerWidth: number;
      }
      
      function CustomNode(props: CustomNodeProps) {
        // Destructure props for clarity
        const { x, y, width, height, index, payload, containerWidth } = props;
        const isOut = x + width + 6 > containerWidth;
      
        return (
          <Layer key={`CustomNode${index}`}>
            <Rectangle
              x={x}
              y={y}
              width={width}
              height={height}
              fill="#5192ca"
              fillOpacity="1"
            />
            <text
              textAnchor={isOut ? "end" : "start"}
              x={isOut ? x - 6 : x + width + 6}
              y={y + height / 2}
              fontSize="14"
              stroke="#333"
            >
              {payload.name}
            </text>
            <text
              textAnchor={isOut ? "end" : "start"}
              x={isOut ? x - 6 : x + width + 6}
              y={y + height / 2 + 13}
              fontSize="12"
              stroke="#333"
              strokeOpacity="0.5"
            >
              {payload.value + "k"}
            </text>
          </Layer>
        );
      }



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
        console.log(data);
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
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto max-w-7xl w-full">
        <DrawerHeader>
            <DrawerTitle>Move Goal</DrawerTitle>
            <DrawerDescription>Set your daily activity goal.</DrawerDescription>
          </DrawerHeader>
          
          <div className="">
  
  <div className="flex h-[400px] items-center justify-center  ">
    {" "}
    {/* Added flexbox styling */}
    <ResponsiveContainer width="100%" height="100%">
      <Sankey
        data={data0}
        node={(nodeProps) => (
          <CustomNode {...nodeProps} containerWidth={960} />
        )}
        link={(linkProps) => <CustomLink {...linkProps} />}
        width={960}
        height={500}
      >
        <defs>
          <linearGradient id="linkGradient">
            <stop offset="0%" stopColor="rgba(0, 136, 254, 0.5)" />
            <stop offset="100%" stopColor="rgba(0, 197, 159, 0.3)" />
          </linearGradient>
        </defs>
        <Tooltip />
      </Sankey>
    </ResponsiveContainer>
  </div>
</div>

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
