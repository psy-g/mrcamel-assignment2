import React, { Component, createRef } from 'react';
import styled from 'styled-components/macro';
import { notInterestedStorage, recentHistoryStorage } from 'utils/storage';

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBtn: true,
    };
    this.checkBoxRef = createRef();
  }

  // 브랜드 필터
  brandFilter = (e) => {
    const target = e;
    const recentHistory = recentHistoryStorage.load();
    let sum = [];

    if (recentHistory && notInterestedStorage.load()) {
      const notInterestedId = notInterestedStorage.load().map((ele) => ele.id);
      sum = recentHistory.map((ele) =>
        notInterestedId.indexOf(ele.id) !== -1
          ? Object.assign(ele, { isNotInterest: true })
          : Object.assign(ele, { isNotInterest: false }),
      );
    } else if (recentHistory) {
      sum = recentHistory.map((ele) => Object.assign(ele, { isNotInterest: false }));
    }
    // 전체
    if (target === '전체') {
      this.props.changeData(sum);
      this.setState({ allBtn: true });
      for (let i = 1; i < this.checkBoxRef.current.children.length; i++) {
        this.checkBoxRef.current.children[i].children[0].checked = false;
      }
    } else {
      let checkbox = this.checkBoxRef.current.getElementsByTagName('input');
      let selectedBrand = [];

      for (let ele of checkbox) {
        if (ele.checked === true) selectedBrand.push(ele.nextSibling.innerText);
      }

      if (selectedBrand.length > 0) {
        let temp = sum.filter((ele) => selectedBrand.indexOf(ele.brand) !== -1);
        this.props.changeData(temp);
        this.setState({ allBtn: false });
      } else {
        this.props.changeData(sum);
        this.setState({ allBtn: true });
      }
    }
  };

  render() {
    const { brand, className } = this.props;
    const { allBtn } = this.state;

    return (
      <Container className={className}>
        <Brand>
          <div>필터: 브랜드</div>
          <CheckboxContainer ref={this.checkBoxRef}>
            {(brand || []).map((ele, index) =>
              index === 0 ? (
                <label key={index}>
                  <StyledCheckbox checked={allBtn} onChange={() => this.brandFilter(ele)} />
                  <span>{ele}</span>
                </label>
              ) : (
                <label key={index}>
                  <RemainCheckbox onChange={this.brandFilter} allBtn={allBtn} />
                  <span>{ele}</span>
                </label>
              ),
            )}
          </CheckboxContainer>
        </Brand>
        <Interest>
          <div>필터: 관심</div>
          <CheckboxContainer>
            <StyledCheckbox onChange={this.props.handleCheckNotInterest} />
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
  type: 'checkbox',
  // checked: props.allBtn ? false : true,
}))`
  display: inline-block;
  width: 2rem;
  height: 2rem;
`;

const RemainCheckbox = styled.input.attrs({
  type: 'checkbox',
})`
  display: inline-block;
  width: 2rem;
  height: 2rem;
`;
