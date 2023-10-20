import React, { useState } from 'react'

const Filter = ({type}) => {
  const [data, setdata] = useState('instructor')

  const resetHandler = () => {
    type('');
  }

  const applyHandler = () => {
    type(data);
    document.querySelector(".filter-menu").classList.toggle("active");
  }

  const filterHandler = () => {
    document.querySelector(".filter-menu").classList.toggle("active");
  }

  return (
    <>
      <div className="filter-button-wrapper">
        <button className="action-button filter jsFilter" onClick={() => filterHandler()}><span>Filter</span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" /></svg></button>
        <div className="filter-menu">
          <label className='main'>Category</label>
          <select className='main' onChange={(e) => setdata(e.target.value)}>
            <option className='main' value="instructor">강사명</option>
            <option className='main' value="title">강의명</option>
            <option className='main' value="tag">태그</option>
          </select>
          <div className="filter-menu-buttons">
            <button className="filter-button reset" onClick={() => resetHandler()}>
              Reset
            </button>
            <button className="filter-button apply" onClick={() => applyHandler()}>
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Filter