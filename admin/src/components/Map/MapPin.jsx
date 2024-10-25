import { Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import domPurify from 'dompurify';
import './MapPin.scss';

export const MapPin = ({ item }) => {
  let latitude = item.latitude;
  let longitude = item.longitude;

  if (!latitude || !longitude) {
    if (item.pin) {
      const [lat, lng] = item.pin
        .split(',')
        .map((coord) => parseFloat(coord.trim()));
      latitude = lat;
      longitude = lng;
    }
  }

  // Function to decode HTML entities
  const decodeHtml = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  // Truncate the description at the first period, sanitize, and decode entities
  const truncateDescription = (desc) => {
    // Sanitize the description
    const sanitizedDescription = domPurify.sanitize(desc, {
      ALLOWED_TAGS: [],
      KEEP_CONTENT: true,
    });

    // Decode any HTML entities
    const decodedDescription = decodeHtml(sanitizedDescription);

    // Find the first period to truncate
    const firstPeriodIndex = decodedDescription.indexOf('.');

    // Truncate the description if a period is found, else return the full decoded text
    return firstPeriodIndex !== -1
      ? decodedDescription.slice(0, firstPeriodIndex + 1)
      : decodedDescription;
  };

  // Check if `item.images` exists and has at least one image
  const imageSrc =
    item.images && item.images.length > 0
      ? item.images[0]
      : 'default_image_url'; // Fallback image URL

  return (
    <Marker position={[latitude, longitude]}>
      <Popup>
        <div className="popupContainer">
          {/* Safely render the image */}
          <img src={imageSrc} alt={item.title} />
          <div className="textContainer">
            <p>
              <Link to={`/${item.id}`}>{item.title}</Link>
            </p>
            {/* Render the sanitized and truncated description */}
            <p>{truncateDescription(item.description)}</p>
            <p>{item.createdAt.slice(0, 10)}</p>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};
