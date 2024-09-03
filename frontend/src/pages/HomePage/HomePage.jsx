// import {SearchBar} from "../../components/SearchBar/SearchBar";
import { useContext, useEffect, useState } from "react";
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
            Welcome to <br />
            Disaster Management System
          </h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus
            adipisci culpa veniam fuga autem. Delectus adipisci culpa veniam
            fuga autem.
          </p>
          {/* <SearchBar />         */}
          <div className="hero-btn">
            <a href="">Latest Updates</a>
            <a href="">Report Disaster</a>
          </div>
        </div>
      </div>
      <div className="imagePart">
       
            <img src={imageSrc} alt="Flood" />
          
    </div>
    </div>
  );
}
