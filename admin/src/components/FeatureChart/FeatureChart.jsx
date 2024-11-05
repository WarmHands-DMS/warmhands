import './FeatureChart.scss';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import { useEffect, useState } from 'react';

const COLORS = [
  '#8884d8',
  '#82ca9d',
  '#ffc658',
  '#ff6f61',
  '#6b5b95',
  '#88b04b',
];

export const FeatureChart = () => {
  const [data, setData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/incidents');
        const monthData = transformData(response.data);
        setData(monthData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Get the current month name
    const monthName = new Date().toLocaleString('default', { month: 'long' });
    setCurrentMonth(monthName);
  }, []);

  // Function to transform fetched data into the required format
  const transformData = (incidents) => {
    const disasterCounts = {
      Flood: 0,
      Fire: 0,
      Cyclone: 0,
      Landslide: 0,
      Tsunami: 0,
      Earthquake: 0,
    };

    const currentMonthIndex = new Date().getMonth(); // Get current month (0-11)
    const currentYear = new Date().getFullYear(); // Get current year

    incidents.forEach((incident) => {
      const date = new Date(incident.createdAt);
      if (
        date.getMonth() === currentMonthIndex &&
        date.getFullYear() === currentYear
      ) {
        // Increment the corresponding disaster type count
        switch (incident.type.toLowerCase()) {
          case 'flood':
            disasterCounts.Flood++;
            break;
          case 'fire':
            disasterCounts.Fire++;
            break;
          case 'cyclone':
            disasterCounts.Cyclone++;
            break;
          case 'landslide':
            disasterCounts.Landslide++;
            break;
          case 'tsunami':
            disasterCounts.Tsunami++;
            break;
          case 'earthquake':
            disasterCounts.Earthquake++;
            break;
          default:
            break;
        }
      }
    });

    // Convert the disasterCounts object into an array format expected by the PieChart
    return Object.entries(disasterCounts).map(([name, value]) => ({
      name,
      value,
    }));
  };

  return (
    <div className="featurechart">
      <div className="title">All Disasters ({currentMonth})</div>
      <div className="piechart">
        <PieChart width={400} height={400}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            innerRadius={60}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};
