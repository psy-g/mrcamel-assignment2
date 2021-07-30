import React, { Component, createRef } from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      checkInterest: true,
      brand: ["전체"],
      allBtn: true,
    };

    this.checkBoxRef = createRef();
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
    const target = e;
    const getSelected = JSON.parse(localStorage.getItem("selected"));

    // 전체
    if (target === "전체") {
      this.setState({ data: getSelected, allBtn: true });
      for (let i = 1; i < this.checkBoxRef.current.children.length; i++) {
        this.checkBoxRef.current.children[i].children[0].checked = false;
      }
    } else {
      // let parent = target.target.parentNode.parentNode;
      // let checkbox = parent.getElementsByTagName("input");
      let checkbox = this.checkBoxRef.current.getElementsByTagName("input");

      let selectedBrand = [];
      for (let ele of checkbox) {
        if (ele.checked === true) selectedBrand.push(ele.nextSibling.innerText);
      }

      if (selectedBrand.length > 0) {
        let temp = getSelected.filter(
          (ele) => selectedBrand.indexOf(ele.brand) !== -1
        );
        this.setState({ data: temp, allBtn: false });
      } else {
        this.setState({ data: getSelected, allBtn: true });
      }
    }
  };

  // 관심 필터
  interestFitler = () => {
    const { checkInterest } = this.state;

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
            <CheckboxContainer ref={this.checkBoxRef}>
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
                      onChange={this.brandFilter}
                      allBtn={allBtn}
                    ></RemainCheckbox>
                    <span>{ele}</span>
                  </label>
                )
              )}
            </CheckboxContainer>
          </Brand>
          <Interest>
            <div>필터: 관심</div>
            <CheckboxContainer>
              <StyledCheckbox onClick={this.interestFitler}></StyledCheckbox>
              <span>관심없는 상품 숨기기</span>
            </CheckboxContainer>
          </Interest>
        </Container>
        {/* {checkInterest ? (
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
        )} */}
        {checkInterest ? (
          <>
            {(data || []).map((ele, index) => (
              <Link to={`/detail/${ele.id}`} key={index}>
                <ProductWrap>
                  <ProductContent>Title: {ele.title}</ProductContent>
                  <ProductContent>Brand: {ele.brand}</ProductContent>
                  <ProductContent>Price: {ele.price}</ProductContent>
                  {!ele.interest && (
                    <ProductInteresting>관심없음</ProductInteresting>
                  )}
                </ProductWrap>
              </Link>
            ))}
          </>
        ) : (
          <>
            {(data || []).map(
              (ele, index) =>
                ele.interest === true && (
                  <Link to={`/detail/${ele.id}`} key={index}>
                    <ProductWrap>
                      <ProductContent>Title: {ele.title}</ProductContent>
                      <ProductContent>Brand: {ele.brand}</ProductContent>
                      <ProductContent>Price: {ele.price}</ProductContent>
                    </ProductWrap>
                  </Link>
                )
            )}
          </>
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
  border: 3px #848484 solid;
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

  span {
    font-size: 2rem;
  }
`;

const StyledCheckbox = styled.input.attrs((props) => ({
  type: "checkbox",
  // checked: props.allBtn ? false : true,
}))`
  display: inline-block;
  width: 16px;
  height: 16px;
`;

const RemainCheckbox = styled.input.attrs({
  type: "checkbox",
})`
  display: inline-block;
  width: 16px;
  height: 16px;
`;

const ProductWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 1rem;
  background-color: #dfe6ed;
  border-radius: 5px;
  margin-top: 2rem;
`;

const ProductContent = styled.p`
  font-size: 2rem;
  margin: 0.5rem;
`;

const ProductInteresting = styled.p`
  position: absolute;
  font-size: 3rem;
  right: 30px;
  top: 35px;
`;
