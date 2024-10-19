import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import "./Map.scss";
import "leaflet/dist/leaflet.css";
import { MapPin } from './MapPin';
import { useState } from 'react';

export const Map = ({items, zoom, latitude, longitude}) => {

    console.log(items);
    

    return (
        <MapContainer className='map' center={[latitude, longitude]} zoom={zoom} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {items.map(item => (
    
            <MapPin key={item.id} item={item}/>
        ))}
        </MapContainer>
    );
};

export const MapWithPinInput = ({ onPinChange }) => {
  const [position, setPosition] = useState(null);

  const MapClickHandler = () => {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition({ lat, lng });
        onPinChange(lat, lng); // Notify parent component of new coordinates
      },
    });

    return position === null ? null : (
      <Marker position={[position.lat, position.lng]}>
        <Popup>
          Latitude: {position.lat} <br /> Longitude: {position.lng}
        </Popup>
      </Marker>
    );
  };

  return (
    <MapContainer
      center={[8.0242, 80.676]}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapClickHandler />
    </MapContainer>
  );
};
