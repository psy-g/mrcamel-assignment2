import React, { Component } from 'react';
import styled from 'styled-components/macro';

class Modal extends Component {
  render() {
    return (
      <ModalWrap>
        <ModalContentWrap>
          <ModalHeader>
            <CloseButton onClick={this.props.onClose}>x</CloseButton>
          </ModalHeader>
          <ModalContent>관심없는 상품입니다!</ModalContent>
        </ModalContentWrap>
      </ModalWrap>
    );
  }
}

const ModalWrap = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
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
export default Modal;
