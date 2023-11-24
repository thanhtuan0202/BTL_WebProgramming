import React, { useState, useEffect } from "react";
import Banner1 from "../../assets/macbanner.png";
import banner_2 from "../../assets/banner_2.png";
import banner_3 from "../../assets/banner_3.png";
import banner_4 from "../../assets/ip14_banner.jpg";
const Banner = () => {
  const images = [Banner1, banner_2, banner_3, banner_4]; // Replace with your own image URLs or import from local project
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const interval = setInterval(goToNextSlide, 10000); // Transition every 3 seconds

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="slide-image"
      style={{
        margin: "15px",
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <button onClick={goToPreviousSlide} style={{backgroundColor: "white"}}>
        <i class="bi bi-chevron-left" style={{ fontSize: "25px" }}></i>
      </button>
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        style={{
          height: "700px",
          width: "1440px",
        }}
      />
      <button onClick={goToNextSlide} style={{backgroundColor: "white"}}>
        <i class="bi bi-chevron-right" style={{ fontSize: "25px" }}></i>
      </button>
    </div>
  );
};

export default Banner;
