import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const LectureList = ({ lectures }) => {

  const nav = useNavigate();

  const handleOnclick = (lecture) => {
    nav(`/lecture/detail/${lecture._id}`, { state: lecture._id });
  }

  return (
    <>
      {Array.isArray(lectures) && lectures.map(lecture => (
        < div className="products-row" onClick={() => handleOnclick(lecture)} style={{caretColor: 'transparent'}}>
          <button className="cell-more-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round" className="feather feather-more-vertical"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>
          </button>
          <div className="product-cell image">
            <img className='main' src={lecture.imageLink} alt={lecture.title} />
            <span>{lecture.title}</span>
          </div>
          <div className="product-cell category"><span className="cell-label">Tag:</span>{lecture.tag}</div>
          {lecture.salePercent !== '-1' && lecture.salePercent &&
            <div className="product-cell sales"><span className="cell-label">SalePercent:</span>{lecture.salePercent}</div>
          }
          {lecture.salePrice !== lecture.ordinaryPrice &&
            <div className="product-cell sales"><span className="cell-label">SalePrice:</span>{lecture.salePrice}원</div>
          }
          <div className="product-cell price"><span className="cell-label">Price:</span>
            {lecture.ordinaryPrice === 0 ? '무료' : lecture.ordinaryPrice + '원'}
          </div>
        </div >
      ))}
    </>
  )
}

export default LectureList