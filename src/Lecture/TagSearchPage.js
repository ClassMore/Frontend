import React, { useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer';
import LectureSearchList from './LectureSearchList';
import axios from 'axios';

const TagSearchPage = () => {

  const [lectures, setLectures] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setloading] = useState(false)
  const [ref, inView] = useInView();
  const [result, setresult] = useState([])

//태크 클릭  
  const getTagBoards = async (keyword) => {
    setloading(true)

    const query = { 
        "size" : "10000",
        "query": {
            "match": {
            "tag": `${keyword}`
            }
        }
    }

    await axios.post(
      'https://search-classmoa-uofe4bd5kkz5loqmz7wk4dpiqa.ap-northeast-2.es.amazonaws.com/lecture/_search',
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
    const res = decodeURI(window.location.href.split("/")[4]);
    let tag = res;
    console.log("tag: " + tag);
    if(res.includes('-')){
      const result = res.split("-")
      tag = result[0] + " " + result[1];
    }
    getTagBoards(tag);
  }, [])

  useEffect(() => {
    if (inView) {
      const start = page * 10;
      setLectures(l => [...l, ...(result.slice(start, start + parseInt(10)))]);
      setPage(page => page + 1)
    }
  }, [inView])

  return (Array.isArray(lectures) &&
    <>
      <LectureSearchList lectures={lectures} />
      <tr ref={ref} style={{marginTop: "3rem"}}></tr>
    </>
  )   
}
export default TagSearchPage