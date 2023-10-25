import React, { useRef } from "react";
import Slider from "react-slick";
import "./SliderTab.css";

const SliderTab = ({ courses }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const sliderRef = useRef(null);

  const goToPrevSlide = () => {
    sliderRef.current.slickPrev();
  };

  const goToNextSlide = () => {
    sliderRef.current.slickNext();
  };

  return (
    <div className="liked-courses">
      <div className="slider-container">
        <button className="button-color" onClick={goToPrevSlide}>
          {""}
        </button>
        <Slider ref={sliderRef} {...sliderSettings}>
          {courses.map((course, index) => (
            <div key={index}>
              <h3>{course}</h3>
            </div>
          ))}
        </Slider>
        <button className="button-color" onClick={goToNextSlide}>
          {""}
        </button>
      </div>
    </div>
  );
};

export default SliderTab;
