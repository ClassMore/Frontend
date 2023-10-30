import React, { useState } from "react";
import "./Box.css";

const Box = ({info}) => {
  const [profileImage, setProfileImage] = useState(null);
  const handleImageChange = (e) => {};

  return (
    <div className="content">
      <div className="profile-section">
        {/* <div className="profile-image">
          <label htmlFor="profile-image-upload" className="upload-label">
            <input
              type="file"
              id="profile-image-upload"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
            <div className="image-upload-button">
              {profileImage ? (
                <img src={profileImage} alt="프로필" />
              ) : (
                <span>프로필 이미지 업로드</span>
              )}
            </div>
          </label>
        </div> */
        <svg width="100px" height="100px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9ZM14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z" fill="var( --app-content-main-color)"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM3 12C3 14.0902 3.71255 16.014 4.90798 17.5417C6.55245 15.3889 9.14627 14 12.0645 14C14.9448 14 17.5092 15.3531 19.1565 17.4583C20.313 15.9443 21 14.0524 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12ZM12 21C9.84977 21 7.87565 20.2459 6.32767 18.9878C7.59352 17.1812 9.69106 16 12.0645 16C14.4084 16 16.4833 17.1521 17.7538 18.9209C16.1939 20.2191 14.1881 21 12 21Z" fill="var( --app-content-main-color)"/>
        </svg>}
        <div className="profile-info">
          <input
            type="text"
            className="input"
            value={info.nickname}
            readOnly
            // placeholder="닉네임을 입력하세요."
          />
          <br></br>

          <input
            type="email"
            className="input"
            value={info.email}
            // placeholder="E-mail을 입력하세요."
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default Box;
