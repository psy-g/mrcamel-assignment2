import React, { Component } from "react";
import styled from "styled-components";

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentDidMount = () => {
    fetch("http://localhost:3000/data/product.json")
      .then((res) => res.json())
      .then((res) => {
        console.log("data", res);
      });
  };

  render() {
    return (
      <Container>
        <Brand>
          <div>필터: 브랜드</div>
          <div>
            <span>전체</span>
            <span>구찌</span>
            <span>루이비통</span>
            <span>스톤아일랜드</span>
          </div>
        </Brand>
        <Interest>
          <div>필터: 관심없음</div>
          <div>관심없는 상품 숨기기</div>
        </Interest>
      </Container>
    );
  }
}

export default Filter;

// filter container
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 2px #848484 solid;
  font-size: 3rem;
`;

// 필터: 브랜드
const Brand = styled.div`
  margin: 10px;

  div:nth-child(1) {
    font-weight: bold;
  }
  div:nth-child(2) {
    margin: 10px;
  }
`;

// 필터: 관심
const Interest = styled.div`
  margin: 10px;

  div:nth-child(1) {
    font-weight: bold;
  }
  div:nth-child(2) {
    margin: 10px;
  }
`;
