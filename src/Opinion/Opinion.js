import React, { useState } from 'react'
import Comment from './Comment'
import axios from 'axios'

const Opinion = ({lectureId}) => {
  const [comments, setcomments] = useState([])
  const url = process.env.REACT_APP_DEFAULT_URL;

  const getOpioions = async () => {
    await axios.get(`${url}${lectureId}/opinions`)
    .then(res => {
      console.log(res);
    });
  }
  
  return (
    <li>
      <div className="comment-main-level">
        {/* <!-- Avatar --> */}
        {/* <div className="comment-avatar">
          <img src="http://i9.photobucket.com/albums/a88/creaticode/avatar_1_zps8e1c80cd.jpg" alt="" />
        </div> */}
        {/* <!-- Contenedor del Comentario --> */}
        <div className="comment-box">
          <div className="comment-head">
            <h6 className="comment-name by-author">
              <span >Agustin Ortiz</span>
            </h6>
            <span>hace 20 minutos</span>
            <i className="fa fa-reply"></i>
            <i className="fa fa-heart"></i>
          </div>
          <div className="comment-content">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit omnis animi et iure laudantium vitae, praesentium optio, sapiente distinctio illo?
          </div>
        </div>
      </div>
      {/* <!-- Respuestas de los comentarios --> */}
      <ul className="comments-list reply-list">
        <Comment comments={comments}/>
      </ul>
    </li>
  )
}

export default Opinion