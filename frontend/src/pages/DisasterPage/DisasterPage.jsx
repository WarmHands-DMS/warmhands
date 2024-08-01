import { Slider } from '../../components/Slider/Slider';
import { disasterData, userData } from '../../lib/dataFeed';
import { Map } from '../../components/Map/Map';

export const DisasterPage = () => {
  const data = disasterData;

  return (
    <div className="disasterPage">
      <div className="details">
        <div className="wrapper">
          <Slider images={data.img} />
          <div className="info">
            <div className="top">
              <div className="disasterInfo">
                <h1>{data.title}</h1>
                <h4>
                  <i
                    className="fa-solid fa-location-dot"
                    style={{ paddingRight: '10px' }}
                  ></i>
                  {data.location}
                </h4>
                <h5>
                  <i
                    className="fa-solid fa-calendar-days"
                    style={{ paddingRight: '10px' }}
                  ></i>
                  {data.date.slice(0, 10)}
                </h5>
                <h5>
                  <i
                    className="fa-solid fa-clock"
                    style={{ paddingRight: '10px' }}
                  ></i>
                  {data.date.slice(11, 13) > 12
                    ? data.date.slice(11, 13) - 12
                    : data.date.slice(11, 13)}
                  {data.date.slice(13, 16)}{' '}
                  {data.date.slice(11, 13) < 12 ? 'AM' : 'PM'}
                </h5>
              </div>
              <div className="userInfo">
                <div>
                  <p>Reported By</p>
                  <img src={userData.img} alt="user" />
                  <span>{userData.name}</span>
                </div>
              </div>
            </div>
            <div className="bottom">{disasterData.desc}</div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <div className="location">
            <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[disasterData]} zoom={14} latitude={7.2484} longitude={80.468} />
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};
