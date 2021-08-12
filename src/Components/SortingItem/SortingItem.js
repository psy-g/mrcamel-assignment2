import React, { Component } from 'react';
import styled from 'styled-components/macro';

class SortingItem extends Component {
  render() {
    const { label, currentSortingOpt } = this.props;
    return (
      <Wrapper>
        <SortingOptionBtn selected={label === currentSortingOpt}>{label}</SortingOptionBtn>
      </Wrapper>
    );
  }
}

export default SortingItem;

const Wrapper = styled.li`
  display: flex;
  justify-content: center;
  width: 100%;

  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;
const SortingOptionBtn = styled.button.attrs(({ selected }) => ({
  color: selected ? '#fff' : '#1b25f0',
  background: selected ? '#1b25f0' : '#fff',
}))`
  width: 15rem;
  height: 3rem;
  border: 1px solid #1b25f0;
  padding: 0.5rem;
  font-weight: 600;
  color: ${({ color }) => color};
  background: ${({ background }) => background};
`;
