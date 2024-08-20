import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";

export const MapPin = ({item}) => {
   console.log(item)  // to get the object of the pin
  
    let latitude = item.latitude;
    let longitude = item.longitude;
    console.log(item.createdAt)
    console.log(longitude)

    if (!latitude || !longitude) {
      if (item.pin) {
        const [lat, lng] = item.pin
          .split(',')
          .map((coord) => parseFloat(coord.trim()));
        latitude = lat;
        longitude = lng;
      }
    }

    return (
        <Marker position={[latitude, longitude]}>
        <Popup>
            <div className="popupContainer">
            <img src={item.img} alt="" />
            <div className="textContainer">
                <Link to={`/${item.id}`}>{item.title}</Link>
                <p>{item.createdAt.slice(0, 10)}</p>
            </div>
            </div>
        </Popup>
        </Marker>
    );
}
