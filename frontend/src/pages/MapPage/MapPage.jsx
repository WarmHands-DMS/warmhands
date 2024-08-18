import { useState } from "react";
import { MapWithPinInput } from "../../components/Map/Map"

export const MapPage = () => {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const handlePinChange = (latitude, longitude) => {
    setLat(latitude);
    setLng(longitude);
  };
  return (
    <div>
      <MapWithPinInput onPinChange={handlePinChange} />
      <div>
        <label>
          Latitude:
          <input type="number" step="any" value={lat} readOnly />
        </label>
        <label>
          Longitude:
          <input type="number" step="any" value={lng} readOnly />
        </label>
      </div>
    </div>
  );
}
