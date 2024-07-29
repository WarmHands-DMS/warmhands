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
          <h2 className="title">
            <Link to={`/${item.id}`}>{item.title}</Link>
          </h2>
          <h5><i className="fa-solid fa-location-dot" style={{paddingRight: "10px"}}></i>{item.location}</h5>
        </div>
        
        <p><LongText description={item.desc}/></p>
        <div className="bottom">
          <span className="date"><i className="fa-solid fa-calendar-days" style={{paddingRight: "10px"}}></i>{item.date}</span>
          <span className="time"><i className="fa-solid fa-clock" style={{paddingRight: "10px"}}></i>{moment.tz(item.date, timeZone).fromNow()}</span>
        </div>

      </div>
    </div>
  )
}

