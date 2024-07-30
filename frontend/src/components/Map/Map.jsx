import { MapContainer, TileLayer } from 'react-leaflet';
import "./Map.scss";
import "leaflet/dist/leaflet.css";
import { MapPin } from './MapPin';

export const Map = ({items}) => {
    

    return (
        <MapContainer className='map' center={[7.847, 80.758]} zoom={8} scrollWheelZoom={false}>
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
