import { Widget } from '../../components/Widget/Widget';
import { Chart } from '../../components/Chart/Chart';
import { FeatureChart } from '../../components/FeatureChart/FeatureChart';
import { HomeTable } from '../../components/HomeTable/HomeTable';
import { useEffect, useState } from 'react';
import axios from 'axios';
;

export const HomePage = () => {
  const [data, setData] = useState([]);
  const [disasterCounts, setDisasterCounts] = useState({
    flood: { total: 0, previousMonth: 0 },
    fire: { total: 0, previousMonth: 0 },
    cyclone: { total: 0, previousMonth: 0 },
    landslide: { total: 0, previousMonth: 0 },
    tsunami: { total: 0, previousMonth: 0 },
    earthquake: { total: 0, previousMonth: 0 },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/incidents');
        const incidents = response.data;
        setData(incidents);

        // Initialize counts
        const counts = {
          flood: { total: 0, previousMonth: 0 },
          fire: { total: 0, previousMonth: 0 },
          cyclone: { total: 0, previousMonth: 0 },
          landslide: { total: 0, previousMonth: 0 },
          tsunami: { total: 0, previousMonth: 0 },
          earthquake: { total: 0, previousMonth: 0 },
        };

        const currentDate = new Date();
        const lastMonth = new Date();
        lastMonth.setMonth(currentDate.getMonth() - 1);

        incidents.forEach((incident) => {
          const incidentDate = new Date(incident.createdAt);
          const type = incident.type.toLowerCase();

          // Count total incidents
          counts[type].total++;

          // Count incidents for the previous month
          if (
            incidentDate.getMonth() === lastMonth.getMonth() &&
            incidentDate.getFullYear() === lastMonth.getFullYear()
          ) {
            counts[type].previousMonth++;
          }
        });

        setDisasterCounts(counts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="homePage scrollbar">
      <div className="widget-section">
        <span className="main-title">Disasters</span>
        <div className="widgets">
          <Widget
            type="flood"
            totalCount={disasterCounts.flood.total}
            previousCount={disasterCounts.flood.previousMonth}
          />
          <Widget
            type="fire"
            totalCount={disasterCounts.fire.total}
            previousCount={disasterCounts.fire.previousMonth}
          />
          <Widget
            type="cyclone"
            totalCount={disasterCounts.cyclone.total}
            previousCount={disasterCounts.cyclone.previousMonth}
          />
          <Widget
            type="landslide"
            totalCount={disasterCounts.landslide.total}
            previousCount={disasterCounts.landslide.previousMonth}
          />
          <Widget
            type="tsunami"
            totalCount={disasterCounts.tsunami.total}
            previousCount={disasterCounts.tsunami.previousMonth}
          />
          <Widget
            type="earthquake"
            totalCount={disasterCounts.earthquake.total}
            previousCount={disasterCounts.earthquake.previousMonth}
          />
        </div>
      </div>
      <div className="chart-section">
        <span className="main-title">Charts</span>
        <div className="charts">
          <FeatureChart />
          <Chart />
        </div>
      </div>
      <div className="list-section">
        <span className="main-title">Lists</span>
        <div className="list">
          <div className="listTitle">Recent Disasters (Reported)</div>
          <HomeTable data={data} />
        </div>
      </div>
    </div>
  );
};
