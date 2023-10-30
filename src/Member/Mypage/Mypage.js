import React, { useState, useEffect, useRef, useCallback } from "react";
import "./Mypage.css";
import * as Tabs from "../Module/tabs";
import * as Decorators from "../Module/decorators";
import * as Panels from "../Module/panels";
import SliderTab from "../components/SliderTab";
import Box from "../components/Box";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';

const Mypage = () => {
  const [activeTab, setActiveTab] = useState("my-info");
  const [profileImage, setProfileImage] = useState(null);
  const sliderRef = useRef(null);
  const decorElemRef = useRef(null);
  const [likedCourses, setLikedCourses] = useState([]);
  const [alarmedCourses, setalarmedCourses] = useState([])
  const [info, setinfo] = useState([])
  const url = process.env.REACT_APP_DEFAULT_URL;

  const handleSaveChanges = () => {
    // 변경된 내용 저장 로직 추가
    // 모달 닫기
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}user/mypage`, {
        headers: {
          Authorization: `${localStorage.getItem('token')}`
        }
      });
      console.log(response);
      setinfo(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  const getAlarmedCourses = useCallback(async () => {
    await axios.get(`${url}user/alarm`,
    {
      headers:{
        "Authorization": `${localStorage.getItem('token')}`
      }
    }).then(res => {
      setalarmedCourses(res.data);
    }).catch(err => {
      console.error(err);
    })
  }, [alarmedCourses])

  const getLikedCourses = useCallback(async () => {
    await axios.get(`${url}user/interest`,
    {
      headers:{
        "Authorization": `${localStorage.getItem('token')}`
      }
    }).then(res => {
      setLikedCourses(res.data);
    }).catch(err => {
      console.error(err);
    })
  }, [likedCourses])

  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
    const tabsNavItems = document.querySelectorAll(".tabs__nav-item");
    const activeItemIndex = Tabs.findActiveItem(tabsNavItems);
    const [decorWidth, decorOffset] =
      Tabs.findActiveItemParams(activeItemIndex);
    const decorElem = Decorators.appendDecorationNav();
    decorElemRef.current = decorElem;
    Decorators.styleDecorElem(decorElem, decorWidth, decorOffset);
    const activePanel = Panels.findActivePanel(activeItemIndex);
    Panels.setActivePanel(activeItemIndex);
  }, []);

  const handleTabClick = (e) => {
    if (e.target.classList.contains("tabs__nav-item")) {
      const clickedTab = e.target;
      const tabsNavItems = document.querySelectorAll(".tabs__nav-item");

      tabsNavItems.forEach((tab) => {
        tab.classList.remove("js-active");
      });

      const activeItemIndex = Array.from(tabsNavItems).indexOf(clickedTab);
      const activeItem = Tabs.findActiveItem(tabsNavItems);
      const [decorWidth, decorOffset] = Tabs.findActiveItemParams(activeItem);
      Decorators.styleDecorElem(decorElemRef.current, decorWidth, decorOffset);
      const activePanel = Panels.findActivePanel(activeItemIndex);
      Panels.setActivePanel(activeItemIndex);

      clickedTab.classList.add("js-active");
    }
  };

  return (
    <>
      {/* <!--PEN HEADER--> */}
      {/* <div className="header">
                <h1 className="header__title">My Page</h1>
            </div> */}
      {/* <!--PEN CONTENT--> */}
      <div className="content">
        {/* <!--content title--> */}
        {/* <h2 className="content__title">Click to any navigation link</h2>  */}
        {/* <!--content inner--> */}
        <div className="content__inner">
          {/* <!--tabs--> */}
          <div className="tabs">
            {/* <!--tabs navigation--> */}
            <div className="tabs__nav" onClick={handleTabClick}>
              <ul className="tabs__nav-list">
                <li
                  className={`tabs__nav-item ${activeTab === "my-info" ? "js-active" : ""
                    }`}
                  onClick={() => setActiveTab("my-info")}
                >
                  내 정보 관리
                </li>
                <li
                  className={`tabs__nav-item ${activeTab === "like-courses" ? "js-active" : ""
                    }`}
                  onClick={() => {
                    setActiveTab("like-courses")
                    getLikedCourses()
                  }}
                >
                  좋아요 강의
                </li>
                <li
                  className={`tabs__nav-item ${activeTab === "notification-courses" ? "js-active" : ""
                    }`}
                  onClick={() => {
                    setActiveTab("notification-courses")
                    getAlarmedCourses();
                  }
                  }
                >
                  알림설정 강의
                </li>
              </ul>
            </div>
            {/* <!--tabs panels--> */}
            <div className="tabs__panels"><hr/>
              {/* <!--single panel--> */}
              <div className="tabs__panel">
                <div className="tabs__panel-card">
                  <Box info={info}/>
                </div>
                <button className="btn-save" onClick={handleSaveChanges}>
                  저장하기
                </button>
              </div>
              {/* <!--single panel--> */}
              <div className="tabs__panel">
                <div className="tabs__panel-card">
                  <SliderTab courses={likedCourses} />
                </div>
              </div>
              {/* <!--single panel--> */}
              <div className="tabs__panel">
                <div className="tabs__panel-card">
                  <SliderTab courses={alarmedCourses} />
                </div>
              </div>
              {/* <!--single panel--> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mypage;
