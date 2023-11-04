import React, { useEffect, useState } from 'react'
import './Main.css'
import { Outlet } from 'react-router-dom';
import ModalButton from '../Member/Modal/ModalButton';
import styled from 'styled-components';
import AutoComplete from '../Search/AutoComplete';

const Main = () => {
  const [active, setactive] = useState(false);
  const [viewType, setviewType] = useState('gridView')
  const [data, setdata] = useState('')
  const [nickname, setnickname] = useState('')
  const [homeActive, sethomeActive] = useState('')
  const [isClicked, setisClicked] = useState(false)
  const [tagActive, settagActive] = useState('')
  const [myPageActive, setmyPageActive] = useState('')

  const frontUrl = process.env.REACT_APP_FRONT_URL;

  const modeSwitch = () => {
    setactive(!active);
    document.documentElement.classList.toggle('light');
    document.querySelector('.mode-switch').classList.toggle('active');
  }

  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nickname');
    localStorage.removeItem('id');
    setnickname('');
  }

  useEffect(() => {
  }, [nickname])

  useEffect(() => {
    setnickname(localStorage.getItem('nickname'))
    if (window.location.href.includes('mypage')) {
      sethomeActive('');
      settagActive('');
      setmyPageActive('active');
    }
    else if (window.location.href.includes('tag')) {
      sethomeActive('');
      settagActive('active');
      setmyPageActive('')
    } else {
      sethomeActive('active');
      settagActive('');
      setmyPageActive('')
    }
  }, [])

  const homeHanlder = (e) => {
    e.preventDefault();
    window.location.href = `${frontUrl}`
  }
  const tagHanlder = (e, value) => {
    e.preventDefault();
    const url = encodeURI(`${frontUrl}tag/${value}`);
    window.location.href = url
  }
  const myPageHanlder = (e) => {
    e.preventDefault();
    window.location.href = `${frontUrl}mypage`
  }

  const tagWrapperHanlder = (e) => {
    setisClicked(c => !c);
  }
  const tagapplyHandler = (e) => {
    setdata(e.target.value);
  }

  return (
    <>
      <div className="app-container">
        <div className="sidebar">
          <div className="sidebar-header">
            <div className="app-icon">
            <a href="http://localhost:3000"><svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 150" preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,190.000000) scale(0.100000,-0.100000)" fill="none" stroke="currentColor" strokeWidth="50"> <path d="M518 1635 c-135 -68 -249 -129 -253 -135 -17 -28 18 -51 258 -172 139 -71 258 -128 265 -128 7 0 111 50 232 110 121 61 222 110 225 110 3 0 5 -40 5 -90 l0 -90 -25 12 c-21 9 -29 7 -60 -16 l-35 -27 0 51 0 50 -150 -75 c-112 -56 -160 -75 -190 -75 -30 0 -78 19 -190 75 l-150 75 0 -55 c0 -30 -4 -55 -8 -55 -5 0 -21 14 -37 30 -16 17 -35 30 -42 30 -19 0 -207 -96 -221 -113 -9 -11 -12 -96 -10 -338 l3 -324 310 -157 c171 -86 320 -157 333 -157 24 -1 642 304 654 323 9 13 11 618 2 641 -4 9 -30 27 -58 42 -86 43 -86 43 -86 155 0 74 4 105 16 123 9 14 14 32 11 40 -8 19 -500 265 -529 264 -13 0 -134 -56 -270 -124z m532 -64 c0 -5 -9 -11 -20 -14 -11 -3 -20 -10 -20 -15 0 -6 9 -8 21 -5 18 5 20 2 17 -23 -2 -23 -9 -30 -35 -35 -38 -7 -43 3 -10 19 l22 11 -22 0 c-27 1 -36 15 -28 40 7 23 75 42 75 22z m-120 -16 c0 -3 -12 -11 -27 -17 l-28 -12 28 -4 c21 -2 27 -9 27 -27 0 -25 -17 -35 -58 -35 -29 0 -20 15 13 23 15 4 13 5 -7 6 -23 1 -28 6 -28 26 0 13 8 29 18 34 18 11 62 15 62 6z m-258 -62 c4 -59 -6 -80 -29 -61 -13 11 -18 99 -6 111 20 20 31 3 35 -50z m138 2 c0 -39 -3 -45 -24 -51 -44 -11 -61 -1 -64 34 -4 43 12 62 54 62 34 0 34 -1 34 -45z m-215 5 c-3 -5 -13 -10 -21 -10 -9 0 -14 -11 -14 -30 0 -24 4 -30 22 -30 16 0 19 -3 11 -11 -6 -6 -23 -9 -39 -7 -25 3 -29 8 -32 36 -2 18 2 40 9 48 13 16 74 20 64 4z m-145 -394 c0 -52 95 -123 204 -152 68 -18 198 -18 271 1 108 29 205 98 205 148 0 10 6 17 13 17 21 0 92 -45 94 -60 2 -10 -68 -50 -225 -126 l-227 -111 -238 115 c-130 64 -237 118 -237 121 0 7 118 69 133 70 4 1 7 -10 7 -23z m871 -351 c2 -129 3 -127 -18 -123 -10 2 -23 -3 -29 -11 -6 -8 -18 -11 -28 -8 -14 6 -16 19 -14 88 l3 82 35 13 c19 7 38 13 43 13 4 1 7 -24 8 -54z m-146 -90 l0 -80 -39 -18 c-32 -15 -40 -16 -47 -5 -11 16 -11 139 -1 154 12 18 46 34 67 31 18 -2 20 -9 20 -82z m-137 -52 c-2 -70 -6 -88 -18 -88 -15 0 -17 8 -19 83 -2 72 -21 37 -21 -39 0 -55 -3 -69 -15 -69 -12 0 -15 14 -15 65 0 89 -18 83 -22 -7 -2 -56 -7 -73 -18 -76 -13 -2 -15 10 -14 75 1 43 2 83 3 90 1 12 94 52 124 52 16 1 17 -8 15 -86z"/> <path d="M754 1506 c-8 -21 3 -49 16 -41 5 3 10 15 10 25 0 25 -18 36 -26 16z"/> <path d="M1260 704 c0 -59 24 -55 28 4 2 33 0 42 -12 42 -12 0 -16 -11 -16 -46z"/> <path d="M1120 655 c0 -33 4 -45 15 -45 11 0 15 12 15 45 0 33 -4 45 -15 45 -11 0 -15 -12 -15 -45z"/> </g> </svg></a>
            </div>
          </div>
          <ul className="sidebar-list">
            <li className={`sidebar-list-item ${homeActive}`}>
              <a href='#' onClick={(e) => homeHanlder(e)} style={{ cursor: "pointer" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-home"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                <span className='main'>Home</span>
              </a>
            </li>
            <li className={`sidebar-list-item ${tagActive}`}>
              <a href='#' onClick={(e) => tagWrapperHanlder(e)} style={{ cursor: "pointer" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 3a1 1 0 0 1 1-1h8a1 1 0 0 1 .707.293l10 10a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-10-10A1 1 0 0 1 2 11V3zm2 1v6.586l9 9L19.586 13l-9-9H4z" fill="currentColor" /><path d="M9 7.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" fill="currentColor" /></svg>
                <span className='main'>Tag</span>
              </a>
            </li>
            {isClicked &&
              <div className="tagfilter-menu">
                <ul className="tagsidebar-list" onChange={(e) => tagapplyHandler(e)}>
                  <li onClick={(e) => tagHanlder(e, "프로그래밍")} className='main' value="프로그래밍">프로그래밍</li>
                  <li onClick={(e) => tagHanlder(e, "앱-개발")} className='main' value="앱-개발">앱 개발</li>
                  <li onClick={(e) => tagHanlder(e, "게임-개발")} className='main' value="게임-개발">게임 개발</li>
                  <li onClick={(e) => tagHanlder(e, "비즈니스")} className='main' value="비즈니스">비즈니스</li>
                  <li onClick={(e) => tagHanlder(e, "자기-개발")} className='main' value="자기-개발">자기 개발</li>
                  <li onClick={(e) => tagHanlder(e, "철학")} className='main' value="철학">철학</li>
                  <li onClick={(e) => tagHanlder(e, "교양")} className='main' value="교양">교양</li>
                  <li onClick={(e) => tagHanlder(e, "데이터")} className='main' value="데이터">데이터</li>
                  <li onClick={(e) => tagHanlder(e, "컴퓨터-공학")} className='main' value="컴퓨터-공학">컴퓨터 공학</li>
                  <li onClick={(e) => tagHanlder(e, "인프라")} className='main' value="인프라">인프라</li>
                  <li onClick={(e) => tagHanlder(e, "디자인")} className='main' value="디자인">디자인</li>
                </ul>
              </div>
            }
            {/* <Tag sethomeActive={sethomeActive} setmyPageActive={setmyPageActive} /> */}
            {localStorage.getItem('token') &&
              <li className={`sidebar-list-item ${myPageActive}`}>
                <a href='#' onClick={(e) => myPageHanlder(e)} style={{ cursor: 'pointer' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-bag"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                  <span className='main'>Mypage</span>
                </a>
              </li>
            }
            {/* <li className="sidebar-list-item">
              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-pie-chart"><path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" /></svg>
                <span className='main'>Statistics</span>
              </a>
            </li>
            <li className="sidebar-list-item">
              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-inbox"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" /></svg>
                <span className='main'>Inbox</span>
              </a>
            </li>
            <li className="sidebar-list-item">
              <a href="#">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                <span className='main'>Notifications</span>
              </a>
            </li> */}
          </ul>
          <div className="account-info">
            {nickname ?
              <>
                <div className="account-info-name">
                  <strong style={{ display: 'block', marginBottom: '2vh' }}>
                    Hello, {nickname}님
                  </strong>

                  <Button style={{ display: "block", marginBottom: '2vh' }}
                    onClick={() => logoutHandler()}>
                    Logout
                  </Button>
                </div>
              </>
              :
              <ModalButton className='modalButton' setter={setnickname}>Login</ModalButton>

            }
          </div>
        </div>
        <div className="app-content">
          <div className="app-content-header">
            <h1 className="app-content-headerText">Products</h1>
            <button className="mode-switch" title="Switch Theme" onClick={() => modeSwitch()}>
              <svg className="moon" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="24" height="24" viewBox="0 0 24 24">
                <defs></defs>
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
              </svg>
            </button>
            {/* <button className="app-content-headerButton" onClick={() => nav('/login')}>Add Product</button> */}
          </div>

          {/* <Search /> */}
          <AutoComplete />

          <div className={`products-area-wrapper ${viewType}`} style={{ overflowY: 'scroll', height: '80vh' }}>
            <div className="products-header">
              <div className="product-cell image">
                Items
                <button className="sort-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
                </button>
              </div>
              <div className="product-cell category">Title
                {/* <button className="sort-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
              </button> */}
              </div>
              <div className="product-cell status-cell">Tag
                {/* <button className="sort-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
              </button> */}
              </div>
              <div className="product-cell sales">Sales
                {/* <button className="sort-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
              </button> */}
              </div>
              <div className="product-cell stock">Stock
                {/* <button className="sort-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
              </button> */}
              </div>
              <div className="product-cell price">Price
                {/* <button className="sort-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 512 512"><path fill="currentColor" d="M496.1 138.3L375.7 17.9c-7.9-7.9-20.6-7.9-28.5 0L226.9 138.3c-7.9 7.9-7.9 20.6 0 28.5 7.9 7.9 20.6 7.9 28.5 0l85.7-85.7v352.8c0 11.3 9.1 20.4 20.4 20.4 11.3 0 20.4-9.1 20.4-20.4V81.1l85.7 85.7c7.9 7.9 20.6 7.9 28.5 0 7.9-7.8 7.9-20.6 0-28.5zM287.1 347.2c-7.9-7.9-20.6-7.9-28.5 0l-85.7 85.7V80.1c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4v352.8l-85.7-85.7c-7.9-7.9-20.6-7.9-28.5 0-7.9 7.9-7.9 20.6 0 28.5l120.4 120.4c7.9 7.9 20.6 7.9 28.5 0l120.4-120.4c7.8-7.9 7.8-20.7-.1-28.5z" /></svg>
              </button> */}
              </div>
            </div>

            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

const Button = styled.button`
  font-size: 14px;
  width: 100%;
  text-align: center;
  padding: 10px 20px;
  border: none;
  background-color: #2869ff;
  border-radius: 10px;
  color: white;
  font-style: italic;
  font-weight: 200;
  cursor: pointer;
  &:hover {
    background-color: #fac2be;
  }
`;

const AppWrap = styled.div`
  text-align: center;
  margin: 50px auto;
`;

export default Main