import { useEffect, useState } from 'react';
import { Card, AreaChart, Title, Text } from '@tremor/react';

interface CrimeData {
  attributes: {
    OFFENSE: string;
    REPORT_DAT: number;
  };
}

interface TransformedData {
  Month: string;
  [offense: string]: number | string;
}

export default function CrimeAreaChart() {
  const [crimeData, setCrimeData] = useState<CrimeData[]>([]);
  const categories = ['HOMICIDE', 'THEFT/OTHER', 'ROBBERY', 'MOTOR VEHICLE THEFT', 'ASSAULT W/DANGEROUS WEAPON', 'BURGLARY', 'THEFT F/AUTO'];

  useEffect(() => {
    const fetchCrimeData = async () => {
      try {
        const response = await fetch(
          'https://maps2.dcgis.dc.gov/dcgis/rest/services/FEEDS/MPD/MapServer/8/query?where=1%3D1&outFields=OFFENSE,REPORT_DAT&f=json'
        );
        const data = await response.json();
        setCrimeData(data.features);
      } catch (error) {
        console.error('Error fetching crime data:', error);
      }
    };

    fetchCrimeData();
  }, []);

  // Create a dictionary to store counts for each offense
  const offenses: Record<string, Record<string, number>> = {};

  // Loop through crimeData to count offenses for each day and each category
  crimeData.forEach((record) => {
    const month = new Date(record.attributes.REPORT_DAT).toLocaleString('default', { month: 'short', year: 'numeric' });
    const offense = record.attributes.OFFENSE;

    if (!offenses[month]) {
      offenses[month] = {};
    }

    if (!offenses[month][offense]) {
      offenses[month][offense] = 1;
    } else {
      offenses[month][offense]++;
    }
  });

  // Transform data for the chart
  const transformedData: TransformedData[] = Object.keys(offenses).map((month) => {
    const offenseCounts = offenses[month];
    const transformedEntry: TransformedData = { Month: month };
  
    // Assign the count for each offense category
    categories.forEach((category) => {
      transformedEntry[category] = offenseCounts?.[category] || 0;
    });
  
    return transformedEntry;
  });

  return (
    <Card className="mt-8  rounded-xl ">
      <Title>Crime Performance</Title>
      <Text>Comparison between different crime types</Text>
      <AreaChart
        className="mt-4 h-80"
        data={transformedData}
        categories={categories}
        index="Month"
        colors={['red', 'blue', 'green', 'orange', 'purple', 'pink', 'brown']}
        valueFormatter={(number: number) => number.toString()}
        yAxisWidth={60}
      />
    </Card>
  );
}
