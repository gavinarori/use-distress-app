import React from 'react';
import { Card, AreaChart, Title, Text } from '@tremor/react';

const categories = [
  'HOMICIDE',
  'THEFT/OTHER',
  'ROBBERY',
  'MOTOR VEHICLE THEFT',
  'ASSAULT W/DANGEROUS WEAPON',
  'BURGLARY',
  'THEFT F/AUTO'
];

const crimeData = [
  { Month: 'Jan 2024', HOMICIDE: 5, 'THEFT/OTHER': 30, ROBBERY: 15, 'MOTOR VEHICLE THEFT': 10, 'ASSAULT W/DANGEROUS WEAPON': 20, BURGLARY: 8, 'THEFT F/AUTO': 12 },
  { Month: 'Feb 2024', HOMICIDE: 4, 'THEFT/OTHER': 25, ROBBERY: 12, 'MOTOR VEHICLE THEFT': 8, 'ASSAULT W/DANGEROUS WEAPON': 18, BURGLARY: 6, 'THEFT F/AUTO': 10 },
  { Month: 'Mar 2024', HOMICIDE: 6, 'THEFT/OTHER': 35, ROBBERY: 18, 'MOTOR VEHICLE THEFT': 12, 'ASSAULT W/DANGEROUS WEAPON': 25, BURGLARY: 10, 'THEFT F/AUTO': 15 },
  { Month: 'Apr 2024', HOMICIDE: 3, 'THEFT/OTHER': 28, ROBBERY: 14, 'MOTOR VEHICLE THEFT': 9, 'ASSAULT W/DANGEROUS WEAPON': 22, BURGLARY: 7, 'THEFT F/AUTO': 11 },
  { Month: 'May 2024', HOMICIDE: 5, 'THEFT/OTHER': 32, ROBBERY: 16, 'MOTOR VEHICLE THEFT': 11, 'ASSAULT W/DANGEROUS WEAPON': 24, BURGLARY: 9, 'THEFT F/AUTO': 13 },
  // Add more months as needed up to the most recent fetched data
];

const CrimeAreaChart: React.FC = () => {
  return (
    <Card className="mt-8 rounded-xl">
      <Title>Crime Performance</Title>
      <Text>Comparison between different crime types</Text>
      <AreaChart
        className="mt-4 h-80"
        data={crimeData}
        categories={categories}
        index="Month"
        colors={['red', 'blue', 'green', 'orange', 'purple', 'pink', 'brown']}
        valueFormatter={(number: number) => number.toString()}
        yAxisWidth={60}
      />
    </Card>
  );
};

export default CrimeAreaChart;
