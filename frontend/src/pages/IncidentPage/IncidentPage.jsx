import { Slider } from '../../components/Slider/Slider';
import { Map } from '../../components/Map/Map';
import { useLoaderData } from 'react-router-dom';
import domPurify from 'dompurify';

export const IncidentPage = () => {
  const incident = useLoaderData();
  console.log(incident);

  const displayTime = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Colombo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(new Date(incident.createdAt));

  console.log(displayTime);

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
                  {displayTime.slice(6, 10) +
                    '-' +
                    displayTime.slice(0, 2) +
                    '-' +
                    displayTime.slice(3, 5)}
                </h5>
                <h5>
                  <i
                    className="fa-solid fa-clock"
                    style={{ paddingRight: '10px' }}
                  ></i>
                  {displayTime.slice(12, 17)} {displayTime.slice(21, 23)}
                </h5>
              </div>
              {incident.user && (
                <div className="userInfo">
                  <div>
                    <p>Reported By</p>
                    <img
                      src={incident.user.avatar || '/no-avatar.png'}
                      alt="user"
                    />
                    <span>{incident.user.fname || '-'}</span>
                  </div>
                </div>
              )}
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: domPurify.sanitize(incident.description),
              }}
            ></div>
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
                latitude={incident.latitude}
                longitude={incident.longitude}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
