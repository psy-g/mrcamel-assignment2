import React, { Component, createRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Layout from "components/layout";
import Filter from "components/filter";
import ModalSortingSelector from "components/modal_sorting_selector";

class RecentList extends Component {
  constructor() {
    super();
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
      <Layout>
        <ListWrap>
          <ProductListTitle>조회한 상품</ProductListTitle>
          <Filter
            data={data}
            brand={brand}
            allBtn={allBtn}
            brandFilter={this.brandFilter}
            interestFitler={this.interestFitler}
            checkBoxRef={this.checkBoxRef}
          />
          <ModalSortingSelector />
          {checkInterest ? (
            <>
              {(data || []).map((ele, index) => (
                <Link to={`/product/${ele.id}`} key={index}>
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
                    <Link to={`/product/${ele.id}`} key={index}>
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
        </ListWrap>
      </Layout>
    );
  }
}

export default RecentList;

const ListWrap = styled.div`
  padding: 3rem 5rem;
`;

const ProductListTitle = styled.p`
  font-size: 3rem;
  font-weight: bold;
`;

const ProductWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 1rem;
  background-color: #dfe6ed;
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
