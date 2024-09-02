import { Map } from "../../components/Map/Map"
import { newsData } from '../../lib/dataFeed';

export const MapPage = () => {
  
  const data = newsData; 

  return (
    <div className="mapPage">
      <Map
        items={data}
        zoom={8}
        latitude={7.847}
        longitude={80.758}
      />
    </div>
  );
}
