import { Link } from "react-router-dom"
import "./Card.scss"
import LongText from "./LongText"
import moment from "moment-timezone"

export const Card = ({item}) => {
   const timeZone = 'Asia/Colombo';
  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.img} alt="" />
      </Link>
      <div className="textContainer">
        <div className="top">
          <h3 className="title">
            <Link to={`/${item.id}`}>{item.title}</Link>
          </h3>
          <h5><i className="fa-solid fa-location-dot" style={{paddingRight: "10px"}}></i>{item.location}</h5>
        </div>
        
        <p><LongText description={item.desc}/></p>
        <div className="bottom">
          <span className="date"><i className="fa-solid fa-calendar-days"></i><p>{item.date.slice(0,10)}</p></span>
          <span className="time"><i className="fa-solid fa-clock"></i><p>{moment.tz(item.date, timeZone).fromNow()}</p></span>
        </div>

      </div>
    </div>
  )
}

