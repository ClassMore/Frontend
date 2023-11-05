import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import axios from 'axios'

const Opinion = ({ lectureId, _write }) => {
  const [content, setcontent] = useState('')
  const [opinions, setopinions] = useState([])
  const [idxList, setidxList] = useState({})
  const [loading, setloading] = useState(false)
  const [viewComment, setviewComment] = useState(false)

  const [writeIdx, setwriteIdx] = useState(-1)
  const [write, setwrite] = useState(false)
  const [edit, setedit] = useState(false);
  const [editIdx, seteditIdx] = useState(-1)
  const [remove, setremove] = useState(false);
  const [modifiedContent, setmodifiedContent] = useState(undefined)
  const [modifiedComment, setmodifiedComment] = useState('')

  const url = process.env.REACT_APP_DEFAULT_URL;

  const getOpinions = async () => {
    setloading(true)
    console.log(lectureId);

    await axios.get(`${url}lecture/${lectureId}/opinions`)
      .then(res => {
        const source = res.data;
        console.log(source);
        setopinions([...source]);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    getOpinions()
  }, [])

  useEffect(() => {
    getOpinions();
  }, [loading, _write, editIdx, remove])

  const clickHandler = (opinion) => {
    console.log(opinion.id);
    if (content.length <= 0) {
      alert("한 글자 이상 입력해주세요");
      return;
    }

    axios.post(`${url}user/opinion/comment`,
      {
        'content': `${content}`,
        'opinionId': `${opinion.id}`,
        'lectureId': `${lectureId}`
      },
      {
        headers: {
          Authorization: `${localStorage.getItem('token')}`
        }
      }).then(res => {
        const source = res.data;
        console.log(res);
        setwrite(w => !w)
        setwriteIdx(-1)
        setcontent('')
        setloading(false)
      }).catch(err => {
        console.log(err);
      })
  }

  const removeHandler = (opinion) => {
    const agree = window.confirm('정말로 삭제하겠습니까?');
    if (!agree) return;

    axios.delete(`${url}user/lecture/opinion`,
      {
        headers: {
          Authorization: `${localStorage.getItem('token')}`
        },
        data: {
          "id": opinion.id,
          "lectureId": lectureId
        }
      }).then(res => {
        alert('삭제되었습니다.');
        setremove(true);
      }).catch(err => {
        console.err(err);
      })
  }

  const modifyHandler = (opinion) => {
    axios.put(`${url}user/lecture/opinion`,
      {
        "content": modifiedContent,
        "id": opinion.id,
        "lectureId": lectureId
      },
      {
        headers: {
          Authorization: `${localStorage.getItem('token')}`
        }
      }).then(res => {
        seteditIdx(-1)
        setmodifiedContent(undefined)
      }).catch(err => {
        console.err(err);
      })
  }

  const changeHandler = (e, setter) => {
    setter(e.target.value);
  }

  return (
    <>
      {Array.isArray(opinions) &&
        opinions.map((opinion, idx) => (
          <li>
            <div className="comment-main-level">
              <div className="comment-box">
                <div className="comment-head">
                  <h6 className="comment-name by-author">
                    <a>{opinion.nickname}</a>
                  </h6>
                  {opinion.isModified && <span>(수정됨)</span>}
                  {opinion.memberId == localStorage.getItem('id') &&
                    <>
                      <button className="editButtonRight" onClick={() => removeHandler(opinion)}>삭제</button>

                      <button className="editButtonRight" onClick={() => {
                        if (editIdx !== idx) seteditIdx(idx);
                        else seteditIdx(-1)
                        setmodifiedContent(undefined)
                      }}>수정</button>
                    </>
                  }
                  {localStorage.getItem('token') &&
                    <button className="editButtonRight" onClick={() => {
                      if (writeIdx === idx) setwriteIdx(-1)
                      else setwriteIdx(idx)
                      setwrite(w => !w)
                    }}>댓글 작성
                    </button>
                  }

                </div>

                <div className="comment-content">
                  {editIdx === idx ?
                    <>
                      <input value={modifiedContent !== undefined ? modifiedContent : opinion.content}
                        onChange={(e) => changeHandler(e, setmodifiedContent)} />
                      <button className="editButton" onClick={() => modifyHandler(opinion)}>수정</button>
                      <button className="editButton" onClick={() => seteditIdx(-1)}>취소</button>
                    </>
                    :
                    `${opinion.content}`
                  }
                </div>
              </div>
            </div>

            <a className='addComment' style={{ marginTop: "1rem", marginLeft: "5rem" }} onClick={() => {
              setviewComment(v => !v)
              if (idxList[idx]) delete idxList[idx]
              else {
                idxList[idx] = true;
              }
            }}>
              {idxList[idx] ? '▲ 답글 보기' : '▼ 답글 보기'}
            </a>

            {writeIdx === idx && write &&
              <ul className='comments-list reply-list'>
                <li>
                  <div className="comment-box">
                    <div className="comment-head">

                      <h6 className="comment-name by-author">
                        <a>{localStorage.getItem('nickname')}</a>
                      </h6>

                    </div>

                    <div className="comment-content">

                      <>
                        <input value={content}
                          onChange={(e) => changeHandler(e, setcontent)} />
                        <button className="editButton" onClick={() => clickHandler(opinion)}>작성</button>
                        <button className="editButton" onClick={() => {
                          if (writeIdx === idx) setwriteIdx(-1)
                          else setwriteIdx(idx)
                          setwrite(w => !w)
                        }}>취소</button>
                      </>

                    </div>
                  </div>
                </li>
              </ul>
            }


            {idxList[idx] &&
              <ul className="comments-list reply-list">
                <Comment opinion={opinion} comments={opinion.comments} />
              </ul>
            }
          </li>

        ))
      }
    </>)
}

export default Opinion