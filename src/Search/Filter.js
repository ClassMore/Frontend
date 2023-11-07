import React, { useCallback, useEffect, useState } from 'react'

const Filter = ({ type }) => {
  const [data, setdata] = useState('title')

  // const resetHandler = () => {
  //   type('');
  // }

  const keyword = {"title": "강의명", "instructor": "강사명", "tag": "태그명"}
  const applyHandler = (e) => {
    document.querySelector(".filter-menu").classList.toggle("active");
    setdata(e.target.value);
  }

  useEffect(() => {
    type(data)
  }, [data])

  const filterHandler = () => {
    document.querySelector(".filter-menu").classList.toggle("active");
  }

  return (
    <>
      <div className="filter-button-wrapper">
        <button className="action-button filter jsFilter" style={{paddingLeft: "0.7vw"}} onClick={() => filterHandler()}>
          <span>{keyword[`${data}`]}</span>
          <svg style={{marginLeft: "1vw"}} xmlns="http://www.w3.org/2000/svg" width="35" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-filter">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
          </svg>
        </button>

        <div style={{marginRight:"3vw"}} className="filter-menu">
          <label className='main'>Category</label>
          <select className='main select' onChange={(e) => applyHandler(e)}>
            <option className='main' value="title">강의명</option>
            <option className='main' value="instructor">강사명</option>
            <option className='main' value="tag">태그명</option>
          </select>
          <div className="filter-menu-buttons">
            {/* <button className="filter-button reset" onClick={() => resetHandler()}>
              Reset
            </button> */}
            {/* <button className="filter-button apply" onClick={() => applyHandler()}>
              Apply
            </button> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Filter