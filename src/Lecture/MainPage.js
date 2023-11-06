import React, { useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer';
import LectureSearchList from './LectureSearchList';
import axios from 'axios';

const MainPage = () => {

  const [lectures, setLectures] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setloading] = useState(false)
  const [ref, inView] = useInView();
  const [result, setresult] = useState([])

  const getLectures = async () => {
    setloading(true)

    const query = {
      "size": 10000,
      "query": {
        "match_all": {}
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
      const source = res.data.hits.hits;
      setresult(l => [...l, ...source])
      setLectures(l => [...l, ...(source.slice(0, 10))])
    });
  }

  useEffect(() => {
    if (inView) {
      const start = page * 10;
      setLectures(l => [...l, ...(result.slice(start, start + parseInt(10)))]);
      setPage(page => page + 1)
    }
  }, [inView])

  useEffect(() => {
    getLectures()
  }, [])

  return (Array.isArray(lectures) &&
    <>
      <LectureSearchList lectures={lectures} />
      <tr style={{marginTop: "3rem"}} ref={ref} ></tr>
    </>
  )
}

export default MainPage