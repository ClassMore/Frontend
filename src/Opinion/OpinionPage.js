import React from 'react'
import './Opinion.css'
import Opinion from './Opinion'

const OpinionPage = ({lectureId}) => {
  return (
    <>
      {/* <!-- Contenedor Principal --> */}
      <div className="comments-container">

        <ul id="comments-list" className="comments-list">
          <Opinion lectureId={lectureId}/>
        </ul>
      </div>
    </>
  )
}

export default OpinionPage