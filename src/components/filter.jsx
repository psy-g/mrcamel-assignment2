import React, { Component, createRef } from "react";
import styled from "styled-components/macro";

class Filter extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      brand,
      allBtn,
      interestFitler,
      brandFilter,
      checkBoxRef,
    } = this.props;

    return (
      <Container>
        <Brand>
          <div>필터: 브랜드</div>
          <CheckboxContainer ref={checkBoxRef}>
            {(brand || []).map((ele, index) =>
              index === 0 ? (
                <label key={index}>
                  <StyledCheckbox
                    checked={allBtn}
                    onChange={() => brandFilter(ele)}
                  ></StyledCheckbox>
                  <span>{ele}</span>
                </label>
              ) : (
                <label key={index}>
                  <RemainCheckbox
                    onChange={brandFilter}
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
            <StyledCheckbox onClick={interestFitler}></StyledCheckbox>
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
