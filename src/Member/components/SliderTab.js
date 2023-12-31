import React, { useRef } from "react";
import Slider from "react-slick";
import "./SliderTab.css";
import { useNavigate } from "react-router-dom";

const SliderTab = ({ courses }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    dots: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const sliderRef = useRef(null);
  const nav = useNavigate();

  const goToPrevSlide = () => {
    sliderRef.current.slickPrev();
  };

  const goToNextSlide = () => {
    sliderRef.current.slickNext();
  };

  return (courses && 
    <div className="liked-courses">
      <div className="slider-container">
        <button className="button-color" onClick={goToPrevSlide}>
          {""}
        </button>
        <Slider ref={sliderRef} {...sliderSettings}>
          {courses.map((course, index) => (
            <div key={index} onClick={() => nav(`/lecture/detail/${course.lectureId}`, {state: course.lectureId})}>
              <img style={{width: "200px", height: "155px"}} src={course.imageLink} alt={course.title}/>
              <h3 style={{color: "white"}}>{course.title}</h3>
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
