import "./Chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  {
    name: 'January',
    flood: 4000,
    fire: 2400,
    cyclone: 2400,
    landslide: 400,
    tsunami: 1000,
    earthquake: 1400,
  },
  {
    name: 'February',
    flood: 3200,
    fire: 2100,
    cyclone: 1800,
    landslide: 500,
    tsunami: 1200,
    earthquake: 1100,
  },
  {
    name: 'March',
    flood: 4500,
    fire: 2500,
    cyclone: 3000,
    landslide: 700,
    tsunami: 900,
    earthquake: 1700,
  },
  {
    name: 'April',
    flood: 3700,
    fire: 1900,
    cyclone: 2600,
    landslide: 600,
    tsunami: 1300,
    earthquake: 1200,
  },
  {
    name: 'May',
    flood: 4000,
    fire: 2300,
    cyclone: 2200,
    landslide: 800,
    tsunami: 1100,
    earthquake: 1500,
  },
  {
    name: 'June',
    flood: 2800,
    fire: 2700,
    cyclone: 2100,
    landslide: 550,
    tsunami: 1000,
    earthquake: 900,
  },
  {
    name: 'July',
    flood: 3500,
    fire: 2400,
    cyclone: 2400,
    landslide: 750,
    tsunami: 1400,
    earthquake: 1300,
  },
  {
    name: 'August',
    flood: 4300,
    fire: 2600,
    cyclone: 2900,
    landslide: 670,
    tsunami: 1500,
    earthquake: 1800,
  },
  {
    name: 'September',
    flood: 3600,
    fire: 2200,
    cyclone: 2800,
    landslide: 680,
    tsunami: 1200,
    earthquake: 1600,
  },
  {
    name: 'October',
    flood: 3100,
    fire: 2000,
    cyclone: 2500,
    landslide: 520,
    tsunami: 900,
    earthquake: 1100,
  },
  {
    name: 'November',
    flood: 3900,
    fire: 2300,
    cyclone: 2700,
    landslide: 590,
    tsunami: 1300,
    earthquake: 1400,
  },
  {
    name: 'December',
    flood: 4100,
    fire: 2800,
    cyclone: 3000,
    landslide: 720,
    tsunami: 1600,
    earthquake: 1700,
  },
];

export const Chart = () => {
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
