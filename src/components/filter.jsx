import React, { Component, createRef } from "react";
import styled from "styled-components/macro";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBtn: true,
    }
    this.checkBoxRef = createRef();
  }

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
  interestFilter = () => {
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
    const {brand} = this.props;

    return (
      <Container>
        <Brand>
          <div>필터: 브랜드</div>
          <CheckboxContainer ref={this.checkBoxRef}>
            {(brand || []).map((ele, index) =>
              index === 0 ? (
                <label key={index}>
                  <StyledCheckbox
                    checked={this.allBtn}
                    onChange={this.brandFilter}
                  />
                  <span>{ele}</span>
                </label>
              ) : (
                <label key={index}>
                  <RemainCheckbox
                    onChange={this.brandFilter}
                    allBtn={this.allBtn}
                  />
                  <span>{ele}</span>
                </label>
              )
            )}
          </CheckboxContainer>
        </Brand>
        <Interest>
          <div>필터: 관심</div>
          <CheckboxContainer>
            <StyledCheckbox onClick={this.interestFilter} />
            <span>관심없는 상품 숨기기</span>
          </CheckboxContainer>
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
  border: 0.4rem #848484 solid;
  font-size: 3rem;
`;

// 필터: 브랜드
const Brand = styled.div`
  margin: 1rem;

  div:nth-child(1) {
    font-weight: bold;
  }
  div:nth-child(2) {
    margin: 1rem;
  }
`;

// 필터: 관심
const Interest = styled.div`
  margin: 1rem;

  div:nth-child(1) {
    font-weight: bold;
  }
  div:nth-child(2) {
    margin: 1rem;
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
  width: 2rem;
  height: 2rem;
`;

const RemainCheckbox = styled.input.attrs({
  type: "checkbox",
})`
  display: inline-block;
  width: 2rem;
  height: 2rem;
`;
