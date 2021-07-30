import React, { Component, createRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Layout from "components/layout";
import Filter from "components/filter";
import ModalSortingSelector from "components/modal_sorting_selector";
import {SORTING_OPTIONS} from "utils/constant";

class RecentList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      checkInterest: true,
      brand: ["전체"],
      currentSortingOpt: SORTING_OPTIONS[0],
    };
  }

  handleSelectSortingOpt = e =>  {
    const target = e.target;
    const nodeName = target.nodeName.toLowerCase();
    if (nodeName === 'button') {
      this.setState({currentSortingOpt: target.innerText});
    }
  }

  // componentDidMount = () => {
  //   fetch("http://localhost:3000/data/product.json")
  //     .then((res) => res.json())
  //     .then((res) => {
  //       let temp = res.filter((ele) => ele.id % 10 === 0); // 필터 작업용
  //       let temp2 = temp.map((ele, index) =>
  //         index % 2 === 0
  //           ? Object.assign(ele, { interest: true })
  //           : Object.assign(ele, { interest: false })
  //       ); // 관심 작업용
  //       localStorage.setItem("selected", JSON.stringify(temp2));
  //       const getSelected = JSON.parse(localStorage.getItem("selected"));
  //       this.setState({ data: getSelected });
  //       let arr = [];
  //       let temp3 = getSelected.filter(
  //         (ele) => arr.indexOf(ele.brand) === -1 && arr.push(ele.brand)
  //       );
  //       let test = [];
  //       temp3.forEach((ele) => test.push(ele.brand));
  //       this.setState({ brand: [...this.state.brand, ...test] });
  //     });
  // };

  // 브랜드 필터


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
          <ModalSortingSelector 
            currentSortingOpt={this.state.currentSortingOpt}
            handleSelectSortingOpt={this.handleSelectSortingOpt}
          />
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
