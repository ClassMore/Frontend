import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer';
import LectureList from './LectureList';

const LectureListPage = () => {
  const [lectures, setLectures] = useState([])
  const [page, setPage] = useState(0)
  const [loading, setloading] = useState(false)
  const [ref, inView] = useInView();
  const url = process.env.REACT_APP_DEFAULT_URL;

  const getBoards = async () => {
    setloading(true)
    await axios.get(
      `${url}lecture?page=${page}&size=10`,
    ).then(res => {
      const source = res.data;
      setLectures(l => [...l, ...source]);
    });
    setloading(true)
  }

  useEffect(() => {
    getBoards()
  }, [page]);

  useEffect(() => {
    if (inView) {
      setPage(page + 1)
    }
  }, [inView, loading])

  return (lectures && 
    <>  
      <LectureList lectures={lectures} />
      <tr ref={ref}></tr>
    </>
  )
}

export default LectureListPage