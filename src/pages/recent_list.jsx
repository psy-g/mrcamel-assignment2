import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Layout from 'components/layout';
import Filter from 'components/filter';
import ModalSortingSelector from 'components/modal_sorting_selector';
import { sortingOptions } from 'utils/constant';
import { getSelected } from 'utils/utils';

class RecentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      checkInterest: true,
      brand: ['전체'],
      currentSortingOpt: sortingOptions.RECENT_VIEW.desc,
    };
  }

  handleSelectSortingOpt = (e) => {
    const target = e.target;
    const nodeName = target.nodeName.toLowerCase();
    if (nodeName === 'button') {
      this.setState({ currentSortingOpt: target.innerText });
    }
  };

  changeData = (change) => {
    this.setState((prevState) => ({
      data: change,
    }));
  };

  componentDidMount = () => {
    let temp = [];
    const getStorage = getSelected();
    const brandArr = getStorage
      .filter((ele) => temp.indexOf(ele.brand) === -1 && temp.push(ele.brand))
      .map((ele) => ele.brand);

    this.setState({ data: getStorage, brand: [...this.state.brand, ...brandArr] });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentSortingOpt !== prevState.currentSortingOpt) {
      switch (this.state.currentSortingOpt) {
        case '최근 조회 순':
          //TODO
          return;

        case '낮은 가격 순':
          const sortedLowPrice = [...this.state.data].sort((a, b) => a[1].price - b[1].price);
          this.setState({ data: sortedLowPrice });
          return;

        default:
          //TODO
          return;
      }
    }
  }

  changeInterest = (change) => {
    this.setState((prevState) => ({
      checkInterest: change,
    }));
  };

  render() {
    const { data, brand, checkInterest } = this.state;

    return (
      <Layout>
        <ListWrap>
          <ProductListTitle>조회한 상품</ProductListTitle>
          <Filter
            data={data}
            brand={brand}
            changeData={this.changeData}
            checkInterest={checkInterest}
            changeInterest={this.changeInterest}
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
                    {!ele.interest && <ProductInteresting>관심없음</ProductInteresting>}
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
                  ),
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
  color: red;
`;
