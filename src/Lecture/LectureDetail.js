import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './LectureDetail.css'
import Alarm from './Alarm/Alarm'
import Interest from './Interest/Interest'

const LectureDetail = ({lectureId}) => {

  const [lecture, setlecture] = useState([])
  const [loading, setloading] = useState(false)
  const [result, setresult] = useState([])

  const getLecture = async () => {
    setloading(true)

    const query = {
      "query": {
        "match" : {
          "_id": `${lectureId}`
        }
      }
    }

    await axios.post(
      'https://search-classmoa-uofe4bd5kkz5loqmz7wk4dpiqa.ap-northeast-2.es.amazonaws.com/search/_search',
      query,
      {
        headers: {
          'Content-type': 'application/json'
        },
        auth: {
          username: process.env.REACT_APP_USERNAME,
          password: process.env.REACT_APP_PASSWORD
        }
      }
    ).then(res => {
      const source = res.data.hits.hits[0]._source;
      console.log(source);
      setlecture(source);
    })
  }

  useEffect(() => {
    getLecture()
  }, [])

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
        <div className="product-cell custom image"><span>{lecture.title}</span></div>
        <br /><div className="product-cell custom category">
          <span className="cell-label">Instructor:
          </span>{lecture.instructor}</div>
        <div className="product-cell custom sales">
          <span className="cell-label">tag:</span>{lecture.tag}</div>
        <div className="product-cell custom stock"><span className="cell-label">site:</span>{lecture.companyName}</div>
        
        <div className="product-cell custom price">
          <span style={{ fontSize: "26px" }} className="cell-label">price:</span>
          {lecture.salePercent === "-1" || lecture.salePercent === "" ? (
            <>{lecture.salePrice}</>
          ) : (
            <>
              <del style={{ opacity: "0.6", position: "absolute", right: "100px" }}>
                {lecture.ordinaryPrice}
              </del>
              {lecture.salePrice}
            </>
          )}
        </div>
        <br />
        <Interest lectureId={lecture.lectureId} />
        <Alarm lectureId={lecture.lectureId} />
        <button className="app-content-headerButton" onClick={() => { window.open(`${lecture.siteLink}`) }} style={{ float: "right" }}>사이트 링크</button>
      </div>
    </>
  )
}

export default LectureDetail