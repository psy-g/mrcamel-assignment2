import React, { Component } from "react";
import styled from "styled-components";

class Filter extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      checkInterest: true,
      brand: ["전체"],
      allBtn: true,
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

        let arr = [];
        let temp3 = getSelected.filter(
          (ele) => arr.indexOf(ele.brand) === -1 && arr.push(ele.brand)
        );

        let test = [];
        temp3.forEach((ele) => test.push(ele.brand));

        this.setState({ brand: [...this.state.brand, ...test] });
      });
  };

  // 브랜드 필터
  brandFilter = (e) => {
    // const target = e.target.innerHTML;
    // const target = e.target.nextSibling.innerHTML;
    const target = e;
    const getSelected = JSON.parse(localStorage.getItem("selected"));

    // 전체
    if (target === "전체") {
      this.setState({ data: getSelected, allBtn: true });
    } else {
      let parent = target.target.parentNode.parentNode;
      let checkbox = parent.getElementsByTagName("input");

      let selectedBrand = [];
      for (let ele of checkbox) {
        if (ele.checked === true) selectedBrand.push(ele.nextSibling.innerText);
      }

      // console.log("selectedBrand", selectedBrand);

      // let temp = getSelected.filter((ele) => ele.brand === target);
      let temp = getSelected.filter(
        (ele) => selectedBrand.indexOf(ele.brand) !== -1
      );
      this.setState({ data: temp, allBtn: false });
    }
  };

  // 관심 필터
  interestFitler = () => {
    const { checkInterest, data } = this.state;
    // const getSelected = JSON.parse(localStorage.getItem("selected"));

    // // 관심 필터 체크 O
    // if (checkInterest) {
    //   let temp = getSelected.filter((ele) => ele.interest === true);
    //   this.setState({ data: temp, checkInterest: false });
    // }
    // // 관심 필터 체크 X
    // else {
    //   this.setState({ data: getSelected, checkInterest: true });
    // }
    // 관심 필터 체크 O
    if (checkInterest) {
      this.setState({ checkInterest: false });
    }
    // 관심 필터 체크 X
    else {
      this.setState({ checkInterest: true });
    }
  };

  render() {
    const { data, brand, allBtn, checkInterest } = this.state;

    return (
      <>
        <Container>
          <Brand>
            <div>필터: 브랜드</div>
            <CheckboxContainer>
              {(brand || []).map((ele, index) =>
                index === 0 ? (
                  <label key={index}>
                    <StyledCheckbox
                      // allBtn={allBtn}
                      checked={allBtn}
                      onChange={() => this.brandFilter(ele)}
                    ></StyledCheckbox>
                    <span>{ele}</span>
                  </label>
                ) : (
                  <label key={index}>
                    <RemainCheckbox
                      // onChange={() => this.brandFilter(ele)}
                      onChange={this.brandFilter}
                      allBtn={allBtn}
                    ></RemainCheckbox>
                    <span>{ele}</span>
                  </label>
                )
              )}
            </CheckboxContainer>
            {/* <button>전체</button>
              <button>구찌</button>
              <button>루이비통</button>
              <button>스톤아일랜드</button> */}
          </Brand>
          <Interest>
            <div>필터: 관심</div>
            {/* <button onClick={this.interestFitler}>관심없는 상품 숨기기</button> */}
            <CheckboxContainer>
              <StyledCheckbox onClick={this.interestFitler}></StyledCheckbox>
              <span>관심없는 상품 숨기기</span>
            </CheckboxContainer>
          </Interest>
        </Container>
        {checkInterest ? (
          <div>
            {(data || []).map((ele, index) => (
              <div key={index}>
                <span>{ele.title}</span>
                <span>{ele.price}</span>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {(data || []).map(
              (ele, index) =>
                ele.interest === true && (
                  <div key={index}>
                    <span>{ele.title}</span>
                    <span>{ele.price}</span>
                  </div>
                )
            )}
          </div>
        )}
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

// 체크박스
const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
`;

const StyledCheckbox = styled.input.attrs((props) => ({
  type: "checkbox",
  // defaultChecked: props.allBtn ? true : false,
  // checked: props.allBtn ? true : false,
  // defaultChecked: false,
}))`
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  transition: all 150ms;
`;

const RemainCheckbox = styled.input.attrs((props) => ({
  type: "checkbox",
  // checked: props.allBtn ? false : true,
}))`
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 3px;
  transition: all 150ms;
`;
