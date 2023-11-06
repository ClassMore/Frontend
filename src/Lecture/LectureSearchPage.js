import React, { useEffect, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer';
import LectureSearchList from './LectureSearchList';
import axios from 'axios';

const LectureSearchPage = () => {

  const [lectures, setLectures] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setloading] = useState(false)
  const [ref, inView] = useInView();
  const [result, setresult] = useState([])
  const [keyword, setkeyword] = useState(localStorage.getItem('keyword'))
  const [type, settype] = useState(localStorage.getItem('type'))

  const getBoards = async () => {
    console.log(type + ": " + keyword);
    setloading(true)

    const query = {
      "instructor": {
        "size": 10000,
        "query": {
          "match": {
            "instructor.ngram": `${keyword}`
          }
        }
      },

      "title": {
        "size": 10000,
        "query": {
          "match": {
            "title.ngram": `${keyword}`
          }
        }
      },

      "tag": {
        "size": 10000,
        "query": {
          "match": {
            "tag.ngram": `${keyword}`
          }
        }
      }
    }

    await axios.post(
      'https://search-classmoa-uofe4bd5kkz5loqmz7wk4dpiqa.ap-northeast-2.es.amazonaws.com/search/_search',
      query[`${type}`],
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
    getBoards()
  }, [])

  return (Array.isArray(lectures) &&
    <>
      <LectureSearchList lectures={lectures.filter(lecture => lecture._source[`${type}`].includes(`${keyword}`))} />
      <tr ref={ref} style={{marginTop: "1rem"}}></tr>
    </>
  )
}

export default LectureSearchPage