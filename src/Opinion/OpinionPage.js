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
    console.log(localStorage.getItem('token'));
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
    if(e.keyCode == 13){
      clickHandler();
      return;
    }
    setcontent(e.target.value);
  }

  return (lectureId &&
    <>
      <div className="comments-container">
        <div style={{ marginLeft: '3rem', marginTop: '2rem' }}>
          <button className="app-content-headerButton" style={{ fontSize: '18px', height: '36px' }}
            onClick={() => {
              if(!localStorage.getItem('token')){
                alert("회원만 등록할 수 있습니다.");
                return;
              }
              setwrite(w => !w)
            }}>
            {write ? '작성 취소' : '의견 작성'}</button>
        </div>

        <ul id="comments-list" className="comments-list">
          {write &&
            <>
              { }
              <ul id='comments-list' className='comments-list'>
                <li>
                  <div className="comment-main-level">
                    <div className="comment-box">
                      <div className="comment-head">
                        <h6 className="comment-name by-author">
                          <a>{localStorage.getItem('nickname')}</a>
                        </h6>
                      </div>

                      <div className="comment-content">
                        <input value={content}
                          onChange={(e) => changeHandler(e)} />
                        <button className='editButton' onClick={() => clickHandler()}>등록</button>
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