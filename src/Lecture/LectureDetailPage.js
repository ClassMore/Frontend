import React, { useEffect, useState } from 'react'
import LectureDetail from './LectureDetail'
import OpinionPage from '../Opinion/OpinionPage'
import LecturePriceChart from './LecturePriceChart'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LectureDetailPage = () => {
  const location = useLocation();
  const [lecture, setLecture] = useState([]);
  const [lectureId, setlectureId] = useState('');
  const url = process.env.REACT_APP_DEFAULT_URL;

  useEffect(() => {
    console.log(lectureId);
    // console.log(lectureId);
    axios.get(`${url}lecture/${lectureId}`)
    .then(result => {
      setLecture(result.data);
    })
    .catch((error) => {
      const message = error.response.data.message;
      if(message){
        alert(error.response.data.message);
        window.location.href=`${frontUrl}`;
      }
    });
  }, [lectureId]);

  useEffect(() => {
    setlectureId(location.state);
  }, [])

  return (lecture && lectureId &&
    <>
      <LectureDetail lecture={lecture}/>
      <LecturePriceChart lectureId={lectureId}/>
      <OpinionPage lectureId={lectureId}/>
    </>
  )
}

export default LectureDetailPage