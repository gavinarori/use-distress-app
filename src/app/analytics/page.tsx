"use client"
import { useEffect, useState } from 'react';
import { Card, Metric, Text, Title, BarList, Flex, Grid } from '@tremor/react';
import Chart from './chart';

interface Offense {
  name: string;
  value: number;
}

interface DataItem {
  category: string;
  stat: string;
  data: Offense[];
}

export default function PlaygroundPage(): JSX.Element {
  const [crimeData, setCrimeData] = useState<any[]>([]);
  const [offensesCount, setOffensesCount] = useState<Record<string, number>>({});
  const [wardOffensesCount, setWardOffensesCount] = useState<Record<string, Record<string, number>>>({});
  const [shiftOffensesCount, setShiftOffensesCount] = useState<Record<string, Record<string, number>>>({});
  const [selectedWard, setSelectedWard] = useState<string>('1');
  const [selectedShift, setSelectedShift] = useState<string>('DAY'); 

  useEffect(() => {
    const fetchCrimeData = async (): Promise<void> => {
      try {
        const response = await fetch(
          'https://maps2.dcgis.dc.gov/dcgis/rest/services/FEEDS/MPD/MapServer/8/query?where=1%3D1&outFields=OFFENSE,WARD,SHIFT&f=json'
        );
        const data = await response.json();
        setCrimeData(data.features);
        console.log(data.features)

        // Perform analysis and set offensesCount, wardOffensesCount, and shiftOffensesCount
        const counts = countOffenses(data.features);
        setOffensesCount(counts);

        const wardCounts = countOffensesByWard(data.features);
        setWardOffensesCount(wardCounts);

        const shiftCounts = countOffensesByShift(data.features);
        setShiftOffensesCount(shiftCounts);
      } catch (error) {
        console.error('Error fetching crime data:', error);
      }
    };
    fetchCrimeData();
  }, []);

  // Function to count occurrences of each offense type
  function countOffenses(data: any[]): Record<string, number> {
    const offenseCounts: Record<string, number> = {};
    
    data.forEach(record => {
      const offenseType = record.attributes.OFFENSE;
      
      if (offenseCounts[offenseType]) {
        offenseCounts[offenseType]++;
      } else {
        offenseCounts[offenseType] = 1;
      }
    });

    return offenseCounts;
  }

  // Function to count occurrences of each offense type by ward
  function countOffensesByWard(data: any[]): Record<string, Record<string, number>> {
    const wardOffenses: Record<string, Record<string, number>> = {};
    
    data.forEach(record => {
      const offenseType = record.attributes.OFFENSE;
      const ward = record.attributes.WARD;

      if (!wardOffenses[ward]) {
        wardOffenses[ward] = {};
      }

      if (wardOffenses[ward][offenseType]) {
        wardOffenses[ward][offenseType]++;
      } else {
        wardOffenses[ward][offenseType] = 1;
      }
    });

    return wardOffenses;
  }

  // Function to count occurrences of each offense type by shift
  function countOffensesByShift(data: any[]): Record<string, Record<string, number>> {
    const shiftOffenses: Record<string, Record<string, number>> = {};
    
    data.forEach(record => {
      const offenseType = record.attributes.OFFENSE;
      const shift = record.attributes.SHIFT;

      if (!shiftOffenses[shift]) {
        shiftOffenses[shift] = {};
      }

      if (shiftOffenses[shift][offenseType]) {
        shiftOffenses[shift][offenseType]++;
      } else {
        shiftOffenses[shift][offenseType] = 1;
      }
    });

    return shiftOffenses;
  }

  const Offenses: Offense[] = Object.keys(offensesCount).map(offense => ({ name: offense, value: offensesCount[offense] }));

  const wardOffenses: Record<string, Offense[]> = {};
  let totalWardOffenses = 0;
  if (selectedWard && wardOffensesCount[selectedWard]) {
    wardOffenses[selectedWard] = Object.keys(wardOffensesCount[selectedWard]).map(offense => {
      totalWardOffenses += wardOffensesCount[selectedWard][offense];
      return { name: offense, value: wardOffensesCount[selectedWard][offense] };
    });
  }

  const shiftOffenses: Record<string, Offense[]> = {};
  let totalShiftOffenses = 0;
  if (selectedShift && shiftOffensesCount[selectedShift]) {
    shiftOffenses[selectedShift] = Object.keys(shiftOffensesCount[selectedShift]).map(offense => {
      totalShiftOffenses += shiftOffensesCount[selectedShift][offense];
      return { name: offense, value: shiftOffensesCount[selectedShift][offense] };
    });
  }

  const data: DataItem[] = [
    {
      category: 'Offenses Count',
      stat: Intl.NumberFormat('us').format(Object.values(offensesCount).reduce((acc, count) => acc + count, 0)),
      data: Offenses,
    },
    {
      category: `Offenses by Ward ${selectedWard}`,
      stat: totalWardOffenses.toString(),
      data: wardOffenses[selectedWard] || [],
    },
    {
      category: `Offenses by Shift ${selectedShift}`,
      stat: totalShiftOffenses.toString(),
      data: shiftOffenses[selectedShift] || [],
    },
  ];

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Grid numItemsSm={2} numItemsLg={3} className="gap-6 ">
        {data.map((item) => (
          <Card key={item.category} className="rounded-lg">
            <Title>{item.category}</Title>
            <Flex
              justifyContent="start"
              alignItems="baseline"
              className="space-x-2  "
            >
              <Metric>{item.stat}</Metric>
              <Text>Total views</Text>
            </Flex>
            <Flex className="mt-6">
              <Text>Pages</Text>
              <Text className="text-right">Views</Text>
            </Flex>
            <BarList
              data={item.data}
              valueFormatter={(number: number) =>
                Intl.NumberFormat('us').format(number).toString()
              }
              className="mt-2 "
            />
          </Card>
        ))}
      </Grid>
      <div className="mt-6">
        <Text>Select Shift: </Text>
        <select
          value={selectedShift}
          onChange={(e) => setSelectedShift(e.target.value)}
        >
          <option value="DAY">Day Shift</option>
          <option value="MIDNIGHT">Midnight Shift</option>
        </select>
      </div>
      <Chart />
    </main>
  );
}
