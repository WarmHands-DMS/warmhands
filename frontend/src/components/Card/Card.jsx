import { Link } from 'react-router-dom';
import './Card.scss';
import LongText from './LongText';
import moment from 'moment-timezone';

export const Card = ({ item }) => {
  const timeZone = 'Asia/Colombo';

  const displayTime = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Colombo',
    year: 'numeric',
    month: '2-digit', // Always two digits for month
    day: '2-digit', // Always two digits for day
    hour: '2-digit', // Always two digits for hour
    minute: '2-digit', // Always two digits for minute
    second: '2-digit', // Always two digits for second
    hour12: true, // 12-hour format
  }).format(new Date(item.createdAt));

  console.log(displayTime)

  // Ensure item.images is defined and is an array with at least one element
  const imageUrl =
    item.images && item.images.length > 0
      ? item.images[0]
      : 'path-to-default-image.png';

  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={imageUrl} alt="" />
      </Link>
      <div className="textContainer">
        <div className="top">
          <h3 className="title">
            <Link to={`/${item.id}`}>{item.title}</Link>
          </h3>
          <h5>
            <i
              className="fa-solid fa-location-dot"
              style={{ paddingRight: '10px' }}
            ></i>
            {item.city}
          </h5>
        </div>

        <div>
          <LongText description={item.description} />
        </div>
        <div className="bottom">
          <span className="date">
            <i className="fa-solid fa-calendar-days"></i>
            <p>{displayTime.slice(6, 10) + '-' + displayTime.slice(0, 2) + "-" + displayTime.slice(3, 5)}</p>
          </span>
          <span className="time">
            <i className="fa-solid fa-clock"></i>
            <p>{moment.tz(item.createdAt, timeZone).fromNow()}</p>
          </span>
        </div>
      </div>
    </div>
  );
};
