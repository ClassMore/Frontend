import React, { useEffect } from 'react'

const frontUrl = process.env.REACT_APP_FRONT_URL

const SocialLogin = () => {
  const url = process.env.REACT_APP_DEFAULT_URL;
  useEffect(() => {
    const data = decodeURI(window.location.href.split('?')[1]);
    const dataSplit = data.split('&');
    const token = "Bearer " + dataSplit[0];
    const nickname = dataSplit[1];
    const id = dataSplit[2]
    localStorage.setItem("token", token);
    localStorage.setItem('nickname', nickname);
    localStorage.setItem("id", id);
    window.location.href = `${frontUrl}`;
  }, [])
  return (
    <></>
  )
}

export default SocialLogin