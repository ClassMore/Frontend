import React, { useEffect, useState } from 'react'
import LectureDetail from './LectureDetail'
import OpinionPage from '../Opinion/OpinionPage'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LectureDetailPage = () => {
  const location = useLocation();
  const nav = useNavigate();
  const [lecture, setLecture] = useState([]);
  const [lectureId, setlectureId] = useState('');
  const url = process.env.REACT_APP_DEFAULT_URL;

  useEffect(() => {
    setlectureId(location.pathname.split('/')[3]);
    // console.log(lectureId);
    axios.get(`${url}lecture/${lectureId}`)
    .then(result => {
      setLecture(result.data);
    })
    .catch((error) => {
      const message = error.response.data.message;
      if(message){
        alert(error.response.data.message);
        window.location.href="http://localhost:3000/";
      }
    });
  }, [lectureId]);

  return (
    <>
      <LectureDetail lecture={lecture}/>
      <OpinionPage lectureId={lectureId}/>
    </>
  )
}

export default LectureDetailPage