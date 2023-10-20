import React, { useEffect, useState } from 'react'
import Filter from './Filter'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Search = ({ setviewType }) => {
  const [list, setlist] = useState('active')
  const [grid, setgrid] = useState('')
  const [keyword, setkeyword] = useState('')
  const [data, setdata] = useState([])
  const [type, settype] = useState('instructor');
  const nav = useNavigate();

  const handleGrind = () => {
    setlist('')
    setgrid('active');
    setviewType('gridView');
  }

  const handleList = () => {
    setlist('active')
    setgrid('');
    setviewType('tableView')
  }

  const inputHandler = (e) => {
    setkeyword(e.target.value);
    // console.log(type + ": " + keyword);
    // if(Array.isArray(data))data.sort((a, b) => b._score - a._score)
    // console.log(data);
    // console.log(data ? data.filter(e => e._source[`${type}`].includes(keyword)) : []);
  }

  const getKeywords = async () => {
    const query = {
      "instructor": {
        "query": {
          "match": {
            "instructor": `${keyword}`
          }
        }
      },

      "title": {
        "query": {
          "match": {
            "title": `${keyword}`
          }
        }
      },
      "tag": {
        "query": {
          "match": {
            "tag": `${keyword}`
          }
        }
      }
    }

    // console.log(query[type])
    await axios.post(
      'https://search-classmoa-uofe4bd5kkz5loqmz7wk4dpiqa.ap-northeast-2.es.amazonaws.com/lecture/_search',
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
      // console.log(source);
      setdata(source);
    });
  }

  useEffect(() => {
    getKeywords();
  }, [keyword])

  return (data &&
    <>
      <div className="app-content-actions">
        <input className="search-bar" placeholder="Search..." value={keyword} type="text" onChange={(e) => inputHandler(e)} />

        <div className="app-content-actions-wrapper">
          <Filter type={settype} />
          <button className={`action-button list ${list}`} onClick={() => handleList()} title="List View">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-list"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
          </button>
          <button className={`action-button grid ${grid}`} onClick={() => handleGrind()} title="Grid View">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-grid"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
          </button>
        </div>
      </div>
    </>
  )
}

export default Search