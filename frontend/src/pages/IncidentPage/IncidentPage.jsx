import { Slider } from '../../components/Slider/Slider';
import { disasterData, userData } from '../../lib/dataFeed';
import { Map } from '../../components/Map/Map';
import { useLoaderData } from 'react-router-dom';
import domPurify from "dompurify";

export const IncidentPage = () => {
  const data = disasterData;

  const incident = useLoaderData();
  console.log(incident);

  console.log(disasterData)

  return (
    <div className="incidentPage">
      <div className="details">
        <div className="wrapper">
          <Slider images={incident.images} />
          <div className="info">
            <div className="top">
              <div className="disasterInfo">
                <h1>{incident.title}</h1>
                <h4>
                  <i
                    className="fa-solid fa-location-dot"
                    style={{ paddingRight: '10px' }}
                  ></i>
                  {incident.city}
                </h4>
                <h5>
                  <i
                    className="fa-solid fa-calendar-days"
                    style={{ paddingRight: '10px' }}
                  ></i>
                  {incident.createdAt.slice(11, 13)}
                </h5>
                <h5>
                  <i
                    className="fa-solid fa-clock"
                    style={{ paddingRight: '10px' }}
                  ></i>
                  {incident.createdAt.slice(11, 13) > 12
                    ? data.date.slice(11, 13) - 12
                    : data.date.slice(11, 13)}
                  {data.date.slice(13, 16)}{' '}
                  {data.date.slice(11, 13) < 12 ? 'AM' : 'PM'}
                </h5>
              </div>
              <div className="userInfo">
                <div>
                  <p>Reported By</p>
                  <img
                    src={incident.user.avatar || '/no-avatar.png'}
                    alt="user"
                  />
                  <span>{incident.user.fname}</span>
                </div>
              </div>
            </div>
            <div className="bottom" dangerouslySetInnerHTML={{__html: domPurify.sanitize(incident.description)}}></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <div className="location">
            <p className="title">Location</p>
            <div className="mapContainer">
              <Map
                items={[incident]}
                zoom={14}
                latitude={6.85294094284376}
                longitude={80.26261732725257}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
