import { useEffect, useState } from 'react';
import { Card, AreaChart, Title, Text } from '@tremor/react';

interface CrimeData {
  attributes: {
    OFFENSE: string;
    REPORT_DAT: number;
  };
}

export default function CrimeAreaChart() {
  const [crimeData, setCrimeData] = useState<CrimeData[]>([]);

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


  const transformedData = crimeData.map((record) => ({
    Month: new Date(record.attributes.REPORT_DAT).toLocaleString('default', { month: 'short', year: 'numeric' }),
    [record.attributes.OFFENSE]: 1, // Assuming each crime event counts as 1
  }));

  const categories = ['HOMICIDE', 'THEFT/OTHER', 'ROBBERY', 'MOTOR VEHICLE THEFT', 'ASSAULT W/DANGEROUS WEAPON', 'BURGLARY', 'THEFT F/AUTO'];

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
