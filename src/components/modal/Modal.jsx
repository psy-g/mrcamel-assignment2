import React, { Component } from "react";
import styled from "styled-components/macro";

const ModalWrap = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const CloseButton = styled.button`
  position: absolute;
  width: 20px;
  height: 20px;
  font-size: 2rem;
  right: 10px;
  top: 9px;
`;

const ModalContentWrap = styled.div`
  width: 400px;
  height: 150px;
`;

const ModalHeader = styled.div`
  position: relative;
  height: 40px;
  background-color: #9eadba;
`;

const ModalContent = styled.p`
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
  background-color: #eee;
  font-size: 2rem;
`;

class Modal extends Component {
  render() {
    return (
      <ModalWrap>
        <ModalContentWrap>
          <ModalHeader>
            <CloseButton>x</CloseButton>
          </ModalHeader>
          <ModalContent>관심없는 상품입니다!</ModalContent>
        </ModalContentWrap>
      </ModalWrap>
    );
  }
}

export default Modal;
