import React, { useEffect } from 'react'

const SocialLogin = () => {
  const url = process.env.REACT_APP_DEFAULT_URL;
  useEffect(() => {
    const token = decodeURI(window.location.href.split('?')[1]);
    const value = {"token": token, expire: new Date() + 300000};
    localStorage.setItem("token", JSON.stringify(value));
    window.location.href = "http://localhost:3000/";
  }, [])
  return (
    <></>
  )
}

export default SocialLogin