import axios from 'axios';
import './Chart.scss';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useEffect, useState } from 'react';

export const Chart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/incidents');
        const transformedData = transformData(response.data);
        setData(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (location.state?.refresh) {
      fetchData();
    }

    fetchData();
  }, []);

  // Function to transform fetched data into a count of disasters by month
  const transformData = (incidents) => {
    const disasterCountByMonth = {
      January: {
        name: 'January',
        flood: 0,
        fire: 0,
        cyclone: 0,
        landslide: 0,
        tsunami: 0,
        earthquake: 0,
      },
      February: {
        name: 'February',
        flood: 0,
        fire: 0,
        cyclone: 0,
        landslide: 0,
        tsunami: 0,
        earthquake: 0,
      },
      March: {
        name: 'March',
        flood: 0,
        fire: 0,
        cyclone: 0,
        landslide: 0,
        tsunami: 0,
        earthquake: 0,
      },
      April: {
        name: 'April',
        flood: 0,
        fire: 0,
        cyclone: 0,
        landslide: 0,
        tsunami: 0,
        earthquake: 0,
      },
      May: {
        name: 'May',
        flood: 0,
        fire: 0,
        cyclone: 0,
        landslide: 0,
        tsunami: 0,
        earthquake: 0,
      },
      June: {
        name: 'June',
        flood: 0,
        fire: 0,
        cyclone: 0,
        landslide: 0,
        tsunami: 0,
        earthquake: 0,
      },
      July: {
        name: 'July',
        flood: 0,
        fire: 0,
        cyclone: 0,
        landslide: 0,
        tsunami: 0,
        earthquake: 0,
      },
      August: {
        name: 'August',
        flood: 0,
        fire: 0,
        cyclone: 0,
        landslide: 0,
        tsunami: 0,
        earthquake: 0,
      },
      September: {
        name: 'September',
        flood: 0,
        fire: 0,
        cyclone: 0,
        landslide: 0,
        tsunami: 0,
        earthquake: 0,
      },
      October: {
        name: 'October',
        flood: 0,
        fire: 0,
        cyclone: 0,
        landslide: 0,
        tsunami: 0,
        earthquake: 0,
      },
      November: {
        name: 'November',
        flood: 0,
        fire: 0,
        cyclone: 0,
        landslide: 0,
        tsunami: 0,
        earthquake: 0,
      },
      December: {
        name: 'December',
        flood: 0,
        fire: 0,
        cyclone: 0,
        landslide: 0,
        tsunami: 0,
        earthquake: 0,
      },
    };

    incidents.forEach((disaster) => {
      // Extract year and month
      const date = new Date(disaster.createdAt);
      const month = date.toLocaleString('default', { month: 'long' }); // Get the full month name

      // Increment the count based on disaster type
      switch (disaster.type.toLowerCase()) {
        case 'flood':
          disasterCountByMonth[month].flood++;
          break;
        case 'fire':
          disasterCountByMonth[month].fire++;
          break;
        case 'cyclone':
          disasterCountByMonth[month].cyclone++;
          break;
        case 'landslide':
          disasterCountByMonth[month].landslide++;
          break;
        case 'tsunami':
          disasterCountByMonth[month].tsunami++;
          break;
        case 'earthquake':
          disasterCountByMonth[month].earthquake++;
          break;
        default:
          break;
      }
    });

    // Convert the object to an array
    return Object.values(disasterCountByMonth);
  };

  return (
    <>
      <div className="chart">
        <div className="title">Last 12 Months (All Disasters)</div>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="flood"
              stackId="1"
              stroke="#8884d8"
              fill="#8884d8"
            />
            <Area
              type="monotone"
              dataKey="fire"
              stackId="1"
              stroke="#82ca9d"
              fill="#82ca9d"
            />
            <Area
              type="monotone"
              dataKey="cyclone"
              stackId="1"
              stroke="#ffc658"
              fill="#ffc658"
            />
            <Area
              type="monotone"
              dataKey="landslide"
              stackId="1"
              stroke="#FF6F61"
              fill="#FF6F61"
            />
            <Area
              type="monotone"
              dataKey="tsunami"
              stackId="1"
              stroke="#6B5B95"
              fill="#6B5B95"
            />
            <Area
              type="monotone"
              dataKey="earthquake"
              stackId="1"
              stroke="#88B04B"
              fill="#88B04B"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};
