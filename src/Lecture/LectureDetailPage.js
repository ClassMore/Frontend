import React from 'react'
import LectureDetail from './LectureDetail'
import OpinionPage from '../Opinion/OpinionPage'
import LecturePriceChart from './LecturePriceChart'

const LectureDetailPage = () => {
  return (
    <>
      <LectureDetail/>
      <LecturePriceChart/>
      <OpinionPage/>
    </>
  )
}

export default LectureDetailPage