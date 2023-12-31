import React, { useState } from 'react'

const Tag = ({sethomeActive, setmyPageActive}) => {

  const [tagActive, settagActive] = useState('')

  const frontUrl = process.env.REACT_APP_FRONT_URL;

  const tagHanlder = (e) => {
    e.preventDefault();
    window.location.href = `${frontUrl}`
  }

  return (
    <li className={`sidebar-list-item ${tagActive}`}>
      <a href='#' onClick={(e) => tagHanlder(e)} style={{ cursor: "pointer" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
        <span className='main'>Tag</span>
      </a>
    </li>
  )
}

export default Tag