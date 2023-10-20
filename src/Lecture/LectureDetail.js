import React from 'react'
import './LectureDetail.css'

const LectureDetail = ({lecture}) => {

  return (
    <>
      <div className="products-row custom">
        <button className="cell-more-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-more-vertical">
            <circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" />
          </svg>
        </button>
        <div className="product-cell custom image">
          <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="product" />
        </div>
      </div>
      <div className="products-row custom">
        <button className="cell-more-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-more-vertical"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
        </button>
        <div className="product-cell custom image"><br /><span>{lecture.title}</span></div>
        <br /><br /><div className="product-cell custom category">
          <span className="cell-label">Instructor:
        </span>{lecture.instructor}</div>
        <br /><div className="product-cell custom sales">
          <span className="cell-label">tag:</span>{lecture.tag}</div>
        <br /><div className="product-cell custom stock"><span className="cell-label">Site:</span>사이트이름</div>
        <br /><div className="product-cell custom price"><span style={{fontSize: "26px"}} className="cell-label">
          <s style={{fontSize: "26px"}}>원가</s>&nbsp;&nbsp;&nbsp;
        <span style={{fontSize: "26px"}}>할인가</span></span></div>
        <br /><br />
        <button className="alarm-switch">
          <svg className="alarm" fill="none" stroke="currentColor" width="30px" height="28px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M287.984 114.16c31.376 0 88.094 15.008 180.094 105.616l45.616 44.912 44.928-45.632c63.872-64.896 131.84-105.2 177.376-105.2 61.408 0 109.809 21.008 157.009 68.096 44.464 44.368 68.992 103.36 68.992 166.112.032 62.784-24.448 121.824-69.408 166.672-3.664 3.712-196.992 212.304-358.96 387.104-7.632 7.248-16.352 8.32-20.991 8.32-4.576 0-13.2-1.024-20.8-8.096-39.472-43.905-325.552-362-358.815-395.232C88.497 462.416 64 403.376 64 340.608c.015-62.752 24.511-121.728 69.04-166.144 43.295-43.264 93.984-60.304 154.944-60.304zm-.002-64c-76.528 0-144 22.895-200.176 79.008-117.072 116.768-117.072 306.128 0 422.96 33.424 33.44 357.855 394.337 357.855 394.337 18.48 18.496 42.753 27.68 66.96 27.68 24.225 0 48.4-9.184 66.912-27.68 0 0 354.88-383.024 358.656-386.85 117.04-116.88 117.04-306.24 0-423.007-58.112-58-123.024-86.784-202.208-86.784-75.648 0-160 60.32-223.008 124.32C447.981 110.159 366.237 50.16 287.981 50.16z" stroke-width="30" /></svg>
        </button>
        <button className="alarm-switch">
          <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.7214 5.00346L11.2549 5.00002C7.91139 4.99217 5.00832 7.70878 4.98528 11.0009V14.7894C4.98528 15.5791 4.88469 16.351 4.45381 17.0081L4.16685 17.4456C3.73107 18.1101 4.19966 19.0002 4.98528 19.0002H19.0147C19.8003 19.0002 20.2689 18.1101 19.8331 17.4456L19.5462 17.0081C19.1153 16.351 19.0147 15.5791 19.0147 14.7894V11.0009C18.9758 7.70863 16.0649 5.0113 12.7214 5.00346Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M15 19C15 20.6569 13.6569 22 12 22C10.3431 22 9 20.6569 9 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 2C13.1046 2 14 2.89543 14 4V5H10V4C10 2.89543 10.8954 2 12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
        <a href=""><button className="app-content-headerButton" style={{float: "right"}}>사이트 링크</button></a>
      </div>
    </>
  )
}



export default LectureDetail