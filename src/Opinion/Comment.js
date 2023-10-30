import axios from 'axios';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'

const Comment = ({opinion, comments, ref}) => {
  useImperativeHandle(ref, () => ({
    // 부모 컴포넌트에서 사용할 함수를 선언
    modifyHandler
  }))

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
                    <button className="editButtonRight"
                      onClick={() => removeHandler(comment)}>삭제</button>
                    <button className="editButtonRight"
                      onClick={() => {
                        setmodifiedContent(undefined)
                        if (idx === editIdx) seteditIdx(-1)
                        else seteditIdx(idx)
                      }}>수정</button>
                  </>
                }
              </div>

              <div className="comment-content">
                {editIdx === idx ?
                  <>
                    <input value={modifiedContent !== undefined ? modifiedContent : comment.content}
                      onChange={(e) => changeHandler(e)} />
                    <button className="editButton" onClick={() => modifyHandler(comment)}>수정</button>
                    <button className="editButton" onClick={() => seteditIdx(-1)}>취소</button>
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