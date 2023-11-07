import React, { useState } from "react";
import "./Box.css";

const Box = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [file, setFile] = useState(null);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const handleImageChange = (e) => {};

  return (
    <div className="content">
      <div className="profile-section">
        <div className="profile-image">
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
        </div>
        <div className="profile-info">
          <input
            type="text"
            className="input"
            placeholder="닉네임을 입력하세요."
          />
          <br></br>

          <input
            type="email"
            className="input"
            placeholder="E-mail을 입력하세요."
            readOnly
          />
        </div>
      </div>
    </div>
  );
};

export default Box;
