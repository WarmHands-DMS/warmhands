import { useState } from "react";
import "./Slider.scss";

export const Slider = ({images}) => {

    const [imageIndex, setImageIndex] = useState(null)
    const changeSlide = (direction) => {
        (direction === "left") ? ((imageIndex === 0) ? setImageIndex(images.length-1) : setImageIndex(imageIndex-1)) : ((imageIndex === images.length-1) ? setImageIndex(0) : setImageIndex(imageIndex+1))
    }

    return (
      <div className="slider">
        {imageIndex !== null && (
          <div className="fullSlider">
            <div className="arrow" onClick={() => changeSlide("left")}>
              <i className="fa-solid fa-2xl fa-arrow-left-long"></i>
            </div>
            <div className="imageContainer">
              <img src={images[imageIndex]} alt="" />
            </div>
            <div className="arrow" onClick={() => changeSlide("right")}>
              <i className="fa-solid fa-2xl fa-arrow-right-long"></i>
            </div>
            <div className="close" onClick={() => setImageIndex(null)}>
              <i className="fa-solid fa-2xl fa-xmark"></i>
            </div>
          </div>
        )}
        <div className="bigImage">
          <img src={images[0]} alt="image" onClick={() => setImageIndex(0)} />
        </div>
        <div className="smallImages">
          {images.slice(1).map((image, index) => (
            <img
              key={index}
              src={image}
              alt="disaster-image"
              onClick={() => setImageIndex(index + 1)}
            />
          ))}
        </div>
      </div>
    );
    }
