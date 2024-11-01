import { useEffect, useState } from 'react';
import axios from 'axios';
import { Map } from '../../components/Map/Map';

export const MapPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/incidents');
        const approvedIncidents = response.data.filter(
          (incident) => incident.isApproved === 'approved'
        );
        setData(approvedIncidents); // Only set approved incidents
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mapPage">
      <Map items={data} zoom={8} latitude={7.847} longitude={80.758} />
    </div>
  );
};
