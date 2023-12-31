import React, { useState } from 'react'
import '../styles.css'
import KAKAOIMAGE from './kakao_login_button.png'
import axios from 'axios'

const Login = ({setter}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const frontUrl = process.env.REACT_APP_FRONT_URL
  const url = process.env.REACT_APP_DEFAULT_URL;

  const handlerLogin = async (e) => {
    e.preventDefault();
    console.log(url);
    await axios.post(url + 'login',
      { "email": email, "password": password })
      .then((res) => {
        if (res.status === 200) {
          const token = res.headers.authorization;
          const nickname = res.data.nickname;
          const id = res.data.id;
          localStorage.setItem("token", token);
          localStorage.setItem("nickname", nickname);
          localStorage.setItem("id", id);
          window.location.href = `${frontUrl}`;
        }
      })
      .catch(error => {
        console.log(error);
        // alert(error.response.data.message);
      });
  }

  const clickHandler = (e) => {
    e.preventDefault();
    setter(false);
  }

  const changeValue = (e, setter) => {
    setter(e.target.value);
  }
  return (
    <div className="login-form">
      <form>
        <input type="text" name="email" className="text-field" placeholder="아이디" value={email} onChange={(e) => changeValue(e, setEmail)} />
        <input type="password" name="password" className="text-field" placeholder="비밀번호" value={password} onChange={(e) => changeValue(e, setPassword)} />
        <button value="로그인" className="submit-btn" onClick={(e) => handlerLogin(e)} style={{cursor: "pointer"}}>로그인</button>
      </form>
      <span className="kakao_login">
        <a href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=a915ca187f6f077e4d9078f82a69526f&redirect_uri=${url}auth/kakao/callback`}>
          <img height="42px" src={KAKAOIMAGE} />
        </a>
      </span>
      <div className="links">
        <span style={{ marginRight: '10px' }}>회원이 아니신가요?</span> 
        <a onClick={(e) => clickHandler(e)} style={{ marginLeft: '10px', cursor: "pointer" }}>회원가입 하기</a>
      </div>
    </div>
  )
}

export default Login;