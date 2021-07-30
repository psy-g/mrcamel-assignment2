import React, { Component } from "react";
import styled from "styled-components";

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      checkInterest: true,
    };
  }

  componentDidMount = () => {
    fetch("http://localhost:3000/data/product.json")
      .then((res) => res.json())
      .then((res) => {
        let temp = res.filter((ele) => ele.id % 10 === 0); // 필터 작업용
        let temp2 = temp.map((ele, index) =>
          index % 2 === 0
            ? Object.assign(ele, { interest: true })
            : Object.assign(ele, { interest: false })
        ); // 관심 작업용

        localStorage.setItem("selected", JSON.stringify(temp2));
        const getSelected = JSON.parse(localStorage.getItem("selected"));
        this.setState({ data: getSelected });
      });
  };

  // 브랜드 필터
  brandFilter = (e) => {
    const target = e.target.innerHTML;
    const getSelected = JSON.parse(localStorage.getItem("selected"));

    // 전체
    if (target === "전체") {
      // console.log("전체", getSelected);
      this.setState({ data: getSelected });
    } else {
      // console.log(
      //   `${target}`,
      //   getSelected.filter((ele) => ele.brand === target)
      // );
      let temp = getSelected.filter((ele) => ele.brand === target);
      this.setState({ data: temp });
    }
  };

  // 관심 필터
  interestFitler = () => {
    const { checkInterest } = this.state;
    const getSelected = JSON.parse(localStorage.getItem("selected"));

    // 관심 필터 체크 O
    if (checkInterest) {
      let temp = getSelected.filter((ele) => ele.interest === true);
      this.setState({ data: temp, checkInterest: false });
    }
    // 관심 필터 체크 X
    else {
      this.setState({ data: getSelected, checkInterest: true });
    }
  };

  render() {
    const { data } = this.state;

    return (
      <>
        <Container>
          <Brand>
            <div>필터: 브랜드</div>
            <div onClick={this.brandFilter}>
              <button>전체</button>
              <button>구찌</button>
              <button>루이비통</button>
              <button>스톤아일랜드</button>
            </div>
          </Brand>
          <Interest>
            <div>필터: 관심</div>
            <button onClick={this.interestFitler}>관심없는 상품 숨기기</button>
          </Interest>
        </Container>

        <div>
          {(data || []).map((ele, index) => (
            <div key={index}>
              <span>{ele.title}</span>
              <span>{ele.price}</span>
            </div>
          ))}
        </div>
      </>
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
