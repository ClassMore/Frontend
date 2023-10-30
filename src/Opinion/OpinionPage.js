import React, { useEffect, useState } from 'react'
import './Opinion.css'
import Opinion from './Opinion'
import axios from 'axios'

const OpinionPage = ({ lectureId }) => {

  const [write, setwrite] = useState(false)
  const [content, setcontent] = useState('')
  const url = process.env.REACT_APP_DEFAULT_URL;


  const clickHandler = () => {
    if (content.length <= 0) {
      alert("한 글자 이상 입력해주세요");
      return;
    }
    axios.post(`${url}user/lecture/${lectureId}/opinion`,
      { 'content': `${content}` },
      {
        headers: {
          Authorization: `${localStorage.getItem('token')}`
        }
      }).then(res => {
        const source = res.data;
        console.log(res);
        setwrite(w => !w)
      }).catch(err => {
        console.log(err);
        setwrite(w => !w)
      })
  }

  const changeHandler = (e) => {
    setcontent(e.target.value);
  }

  return (lectureId &&
    <>
      <div className="comments-container">
        <div style={{ marginLeft: '50rem' }}>
          <button className="app-content-headerButton" onClick={() => { setwrite(w => !w) }}>의견 작성</button>
        </div>

        <ul id="comments-list" className="comments-list">
          {write &&
            <>
              {/* <br/><input type='text' onChange={(e) => changeHandler(e)} />&nbsp;
              <button className="app-content-headerButton" onClick={() => clickHandler(true)}>작성</button>&nbsp;
              <button className="app-content-headerButton" onClick={() => { setwrite(w => !w) }}>닫기</button> */}
              <ul id='comments-list' className='comments-list'>
                <li>
                  <div className="comment-main-level">
                    <div className="comment-box">
                      <div className="comment-head">
                        <h6 className="comment-name by-author">
                          <a>{localStorage.getItem('nickname')}</a>
                        </h6>


                        <div className="comment-content" style={{marginTop: '1rem'}}>
                          <input value={content}
                            onChange={(e) => changeHandler(e)} />
                          <button onClick={() => clickHandler()}>작성</button>
                          <button onClick={() => setwrite(w => !w)}>취소</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </>
          }
          <Opinion _write={write} lectureId={lectureId} />
        </ul>
      </div>
    </>
  )
}

export default OpinionPage