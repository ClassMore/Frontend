import React, { useState } from 'react'
import styled from 'styled-components';
import Modal from './Modal';

const ModalButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onClickButton = () => {
    setIsOpen(true);
  };

  return (
    <AppWrap>
      <Button onClick={onClickButton}>Login</Button>
      {isOpen && (<Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />)}
    </AppWrap>
  );
}

const Button = styled.button`
  font-size: 14px;
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
export default ModalButton;