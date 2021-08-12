import React, { Component } from 'react';
import styled from 'styled-components/macro';

import Modal from 'Components/Modal/Modal';
import SortingItem from 'Components/SortingItem/SortingItem';

import { sortingOptions } from 'Constants/Constant';

class ModalSortingSelector extends Component {
  render() {
    const { currentSortingOpt, handleSelectSortingOpt, className } = this.props;
    return (
      <Modal
        label="상품정렬 옵션 선택 모달"
        trigger={({ handleOpen, isOpen }) => (
          <OpenerBtn className={className} aria-haspopup="true" aria-pressed={isOpen} onClick={handleOpen}>
            정렬: {currentSortingOpt}
          </OpenerBtn>
        )}
      >
        <SortingList onClick={handleSelectSortingOpt}>
          {Object.keys(sortingOptions).map((item) => (
            <SortingItem
              key={sortingOptions[item].desc}
              label={sortingOptions[item].desc}
              currentSortingOpt={currentSortingOpt}
            />
          ))}
        </SortingList>
      </Modal>
    );
  }
}

export default ModalSortingSelector;

const OpenerBtn = styled.button`
  width: 15rem;
  height: 3rem;
  border: 1px solid #1b25f0;
  padding: 0.5rem;
  font-weight: 600;
  color: #1b25f0;
`;
const SortingList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 15rem;
  background-color: #eee;
  font-size: 2rem;
`;
