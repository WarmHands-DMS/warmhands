// import {SearchBar} from "../../components/SearchBar/SearchBar";
import { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import LandSlide from '../../assets/landslide.svg';
import Cyclone from '../../assets/cyclone.svg';
import Flood from '../../assets/flood.svg';
import Tsunami from '../../assets/tsunami.svg';
import Fire from '../../assets/fire.svg';

export const HomePage = () => {

  const {currentUser} = useContext(AuthContext);
  console.log(currentUser)

  const [imageSrc, setImageSrc] = useState(Flood);

  useEffect(() => {
    const images = [Flood, LandSlide, Cyclone, Tsunami, Fire]; // Array of images to cycle through
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      setImageSrc(images[currentIndex]);
    }, 20000); // 25 seconds in milliseconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="homePage">
      <div className="textPart">
        <div className="wrapper">
          <h1 className="title">
            Together, We’re Stronger <br />
            <span>WarmHands</span>
          </h1>
          <p>
            WarmHands is built on the power of community and collaboration. In
            times of need, our platform allows you to quickly report
            emergencies, receive critical updates and access lifesaving
            information. Let’s work together to create safer, more
            resilient communities.
          </p>
          {/* <SearchBar />         */}
          <div className="hero-btn">
            <Link to={"/news"}>Latest Updates</Link>
            <Link to={currentUser ? "/report" : "/signin"}>Report Disaster</Link>
          </div>
        </div>
      </div>
      <div className="imagePart">
        <img src={imageSrc} alt="Flood" />
      </div>
    </div>
  );
}
