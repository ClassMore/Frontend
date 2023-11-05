import React, { useEffect, useState } from 'react'
import '../styles.css'
import axios from 'axios'
import Timer from '../../Timer/Timer';


const Join = ({setter}) => {
  const [email, setemail] = useState('');
  const [loading, setloading] = useState(false)
  const [verify, setverify] = useState(false)
  const [code, setcode] = useState('')
  const [nickName, setnickName] = useState('')
  const [password, setpassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')

  const frontUrl = process.env.REACT_APP_FRONT_URL
  const url = process.env.REACT_APP_DEFAULT_URL;

  const emailCheckHandler = () => {
    axios.post(url + 'email/check', 
    {"email": email})
    .then(res => {
      setloading(false);
      setloading(true);
    });
  }

  const emailVerificationHandler = () => {
    axios.post(`${url}email/verification`, 
    {"email": email, "authCode": code})
    .then(res => {
      if(res.data)alert('이메일 인증에 성공했습니다.')
      else alert('인증코드가 다릅니다.')
      setverify(res.data);
    });
  }

  const chnageHandler = (e, setter) => {
    setter(e.target.value);
  }

  const clickHandler = (e) => {
    e.preventDefault();
    setter(true);
  }

  const joinHandler = (e) => {
    e.preventDefault();
    if(!email || !password || !nickName){
      alert("모든 란은 채워주세요");
      return;
    }
    if(password !== confirmPassword){
      alert("비밀번호가 일치하지 않습니다.")
    }
    if(!verify){
      alert("이메일 인증을 해주세요");
      return;
    }
    const joinMemebr = {
      "email": email,
      "nickname": nickName,
      "password": password
    }
    axios.post(`${url}join`,
    joinMemebr
    )
    .then(res => {
      window.alert("회원가입에 성공하였습니다.")
      window.location.href = `${frontUrl}`;
    }).catch(error => {
      console.log(error);
      alert(error.response.data.message)
    })
  }


  return (
    <div class="join-form">
        <form action={`http://${url}/join`} method="post">
            <input type="text" name="memberName" class="text-field" value={email} 
            onChange={(e) => chnageHandler(e, setemail)} placeholder="이메일"/>
            <button class="auth-send-btn" onClick={() => emailCheckHandler()} type="button">인증코드 보내기</button>

            <input type="text" name="code" id="code" class="text-field" placeholder="인증코드" onChange={(e) => chnageHandler(e, setcode)}
            value={code}/>
            {loading && <Timer mm={3} ss={0}/>}
            <button class="auth-submit-btn" onClick={() => emailVerificationHandler()} type="button">이메일 인증하기</button>

            <input type="text" name="nickName" class="text-field" placeholder="닉네임"
            value={nickName} onChange={(e) => chnageHandler(e, setnickName)}/>
            <input type="password" name="password" class="text-field" placeholder="비밀번호"
            value={password} onChange={(e) => chnageHandler(e, setpassword)}/>
            <input type="password" name="password-valid" class="text-field" placeholder="비밀번호 확인"
            value={confirmPassword} onChange={(e) => chnageHandler(e, setconfirmPassword)}/>

            <input type="submit" onClick={(e) => joinHandler(e)} value="가입하기" class="submit-btn"/>
        </form>
        <div class="links">
            <a onClick={(e) => clickHandler(e)} style={{cursor: "pointer"}}>이미 회원이신가요? &nbsp;</a>
             <a onClick={(e) => clickHandler(e)} style={{fontWeight: "bold", cursor: "pointer"}}> 로그인 하기</a>
        </div>
    </div>
  )
}

export default Join