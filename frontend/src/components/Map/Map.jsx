import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import "./Map.scss";
import "leaflet/dist/leaflet.css";
import { MapPin } from './MapPin';
import { useEffect, useState } from 'react';

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
  const [position, setPosition] = useState(null); // For current location
  const [markerPosition, setMarkerPosition] = useState(null); // For the marker position

  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const currentPosition = {
              lat: pos.coords.latitude,
              lng: pos.coords.longitude,
            };
            console.log('Current Position:', currentPosition); // Debugging log
            setPosition(currentPosition);
            setMarkerPosition(currentPosition); // Set marker to current location
          },
          (error) => {
            console.error('Error getting location:', error);
            const fallbackPosition = { lat: 6.982655, lng: 79.9472393 }; // Default fallback
            setPosition(fallbackPosition);
            setMarkerPosition(fallbackPosition); // Set marker to fallback position
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        const fallbackPosition = { lat: 6.982655, lng: 79.9472393 }; // Default fallback
        setPosition(fallbackPosition);
        setMarkerPosition(fallbackPosition); // Set marker to fallback position
      }
    };

    getCurrentLocation();
  }, []); // Runs once on mount

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarkerPosition({ lat, lng }); // Update marker position
        onPinChange(lat, lng); // Notify parent component of new coordinates
      },
    });

    return null; // No additional rendering needed
  };

  return (
    <MapContainer
      center={
        markerPosition
          ? [markerPosition.lat, markerPosition.lng]
          : [6.982655, 79.9472393]
      } // Center based on position
      zoom={13}
      style={{ height: '400px', width: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {markerPosition && ( // Render marker based on markerPosition state
        <Marker position={[markerPosition.lat, markerPosition.lng]}>
          <Popup>
            Latitude: {markerPosition.lat} <br /> Longitude:{' '}
            {markerPosition.lng}
          </Popup>
        </Marker>
      )}
      <MapClickHandler />
    </MapContainer>
  );
};

