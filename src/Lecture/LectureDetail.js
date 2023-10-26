import React from 'react'
import './LectureDetail.css'
import Alarm from './Alarm/Alarm'
import Interest from './Interest/Interest'

const LectureDetail = ({ lecture }) => {

  return (lecture &&
    <>
      <div className="products-row custom">
        <button className="cell-more-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-more-vertical">
            <circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" />
          </svg>
        </button>
        <div className="product-cell custom image">
          <img src={lecture.imageLink} alt={lecture.title} />
        </div>
      </div>
      <div className="products-row custom">
        <button className="cell-more-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-more-vertical"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
        </button>
        <div className="product-cell custom image"><br /><span>{lecture.title}</span></div>
        <br /><div className="product-cell custom category">
          <span className="cell-label">Instructor:
          </span>{lecture.instructor}</div>
        <br /><div className="product-cell custom sales">
          <span className="cell-label">tag:</span>{lecture.tag}</div>
        <br /><div className="product-cell custom stock"><span className="cell-label">Site:</span>{lecture.companyName}</div>
        <br /><div className="product-cell custom price">
          <span style={{ fontSize: "26px" }} className="cell-label">가격</span> 
        </div>
        <br /><br />
        <Interest lectureId={lecture.lectureId} />
        <Alarm lectureId={lecture.lectureId} />
        <button className="app-content-headerButton" onClick={() => { window.open(`${lecture.siteLink}`) }} style={{ float: "right" }}>사이트 링크</button>
      </div>
    </>
  )
}



export default LectureDetail