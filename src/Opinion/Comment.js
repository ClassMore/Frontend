import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Comment = ({ opinion, comments }) => {


  const [remove, setremove] = useState(false);
  const [editIdx, seteditIdx] = useState(-1)


  const [modifiedContent, setmodifiedContent] = useState(undefined)
  const url = process.env.REACT_APP_DEFAULT_URL;

  const removeHandler = (comment) => {
    const agree = window.confirm("정말로 삭제하겠습니까?")
    if (!agree) return;

    axios.delete(`${url}user/opinion/comment`,
      {
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          "id": comment.id
        }
      }
    ).then(res => {
      alert("삭제했습니다.")
      setremove(r => !r)
      comment.id = -1
    }).catch(err => {
      console.err(err);
    })
  }

  const modifyHandler = (comment) => {
    axios.put(`${url}user/opinion/comment`,
      {
        "id": comment.id,
        "content": modifiedContent,
      },
      {
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }
    ).then(res => {
      alert("수정했습니다.")
      seteditIdx(-1)
      comment.content = modifiedContent
    }).catch(err => {
      console.err(err);
    })
  }

  useEffect(() => {

  }, [comments, editIdx, remove])

  const changeHandler = (e) => {
    setmodifiedContent(e.target.value)
  }

  return (
    <>
      {
        opinion && Array.isArray(comments) &&
        comments.map((comment, idx) => (
          comment.id != -1 &&
          <li>
            <div className="comment-box">
              <div className="comment-head">
                {opinion.memberId !== comment.memberId ?
                  <h6 className="comment-name">
                    <a>{comment.nickname}</a></h6>
                  :
                  <h6 className="comment-name by-author">
                    <a>{comment.nickname}</a>
                  </h6>
                }
                {comment.isModified && <span>(수정됨)</span>}
                {comment.memberId == localStorage.getItem('id') &&
                  <>
                    <button
                      onClick={() => removeHandler(comment)}
                      style={{ float: "right", marginLeft: "0.5rem" }}>삭제</button>
                    <button
                      onClick={() => {
                        setmodifiedContent(undefined)
                        if (idx === editIdx) seteditIdx(-1)
                        else seteditIdx(idx)
                      }}
                      style={{ float: "right" }}>수정</button>
                  </>
                }
              </div>

              <div className="comment-content">
                {editIdx === idx ?
                  <>
                    <input value={modifiedContent !== undefined ? modifiedContent : comment.content}
                      onChange={(e) => changeHandler(e)} />
                    <button onClick={() => modifyHandler(comment)}>수정</button>
                    <button onClick={() => seteditIdx(-1)}>취소</button>
                  </>
                  :
                  `${comment.content}`
                }
              </div>
            </div>
          </li>
        ))
      }

    </>
  )
}

export default Comment