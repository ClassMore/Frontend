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

  const url = process.env.REACT_APP_DEFAULT_URL;

  const getOpioions = async () => {
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
    getOpioions()
  }, [])

  useEffect(() => {
    getOpioions();
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
                      <button onClick={() => removeHandler(opinion)}
                        style={{ float: "right", marginLeft: '0.5rem' }}>삭제</button>

                      <button onClick={() => {
                        if (editIdx !== idx) seteditIdx(idx);
                        else seteditIdx(-1)
                        setmodifiedContent(undefined)
                      }} style={{ float: "right" }}>수정</button>
                    </>
                  }
                </div>

                <div className="comment-content">
                  {editIdx === idx ?
                    <>
                      <input value={modifiedContent !== undefined ? modifiedContent : opinion.content}
                        onChange={(e) => changeHandler(e, setmodifiedContent)} />
                      <button onClick={() => modifyHandler(opinion)}>수정</button>
                      <button onClick={() => seteditIdx(-1)}>취소</button>
                    </>
                    :
                    `${opinion.content}`
                  }
                </div>
              </div>
            </div>

            <a style={{ marginLeft: "38.5rem" }} onClick={() => {
              setviewComment(v => !v)
              if (idxList[idx]) delete idxList[idx]
              else {
                idxList[idx] = true;
              }
            }}>
              {idxList[idx] ? '△답글보기' : '▽답글보기'}
            </a>

            <button onClick={() => {
              if (writeIdx === idx) setwriteIdx(-1)
              else setwriteIdx(idx)
              setwrite(w => !w)
            }}>댓글 작성
            </button>

            {writeIdx === idx && write &&
              <>
                <input type='text' onChange={(e) => changeHandler(e, setcontent)} />
                <button onClick={() => clickHandler(opinion)}>작성</button>
                <button onClick={() => {
                  setwriteIdx(-1)
                  setwrite(w => !w)
                }}>닫기</button>
              </>
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