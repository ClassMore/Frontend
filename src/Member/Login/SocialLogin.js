import React, { useEffect } from 'react'

const SocialLogin = () => {
  const url = process.env.REACT_APP_DEFAULT_URL;
  useEffect(() => {
    const data = decodeURI(window.location.href.split('?')[1]);
    const dataSplit = data.split('&');
    const token = "Bearer " + dataSplit[0];
    const nickname = dataSplit[1];
    localStorage.setItem("token", token);
    localStorage.setItem('nickname', nickname);
    window.location.href = "http://localhost:3000/";
  }, [])
  return (
    <></>
  )
}

export default SocialLogin