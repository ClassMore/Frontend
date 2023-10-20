import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import '../styles.css'
import Login from "../Login/Login";
import Join from "../Join/Join";

const Modal = ({ onClose }) => {
  const [login, setlogin] = useState(true);
  const outside = useRef();

  const handleClose = (e) => {
    if(e.target != outside.current)return;
    onClose?.();
  };

  useEffect(() => {
    console.log(login);
  }, [login])

  return (

    <Overlay ref={outside} onClick={(e) => handleClose(e)}>
      {
        login ? <Login setter={setlogin} /> : <Join setter={setlogin} />
      }
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

const ModalWrap = styled.div`
  width: 600px;
  height: fit-content;
  border-radius: 15px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const CloseButton = styled.div`
  float: right;
  width: 40px;
  height: 40px;
  margin: 20px;
  cursor: pointer;
  i {
    color: #5d5d5d;
    font-size: 30px;
  }
`;

const Button = styled.button`
  font-size: 14px;
  margin-bottom: -25vh;
  padding: 10px 20px;
  border: none;
  background-color: #ababab;
  border-radius: 10px;
  color: white;
  font-style: italic;
  font-weight: 200;
  cursor: pointer;
  &:hover {
    background-color: #898989;
  }
`;
export default Modal;