import React, { Component } from 'react';
import styled from 'styled-components/macro';
import { createPortal } from 'react-dom';

import { sortingOptions } from 'utils/constant';
import { notInterestedStorage, recentHistoryStorage} from 'utils/storage';
import Layout from 'components/layout';
import Filter from 'components/filter';
import ModalSortingSelector from 'components/modal_sorting_selector';
import Product from 'components/product';
import Alert from 'components/alert';


class RecentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      data: [],
      isCheckNotInterest: false,
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

  combineData = () => {
    const recentHistory = recentHistoryStorage.load();
    const notInterestedId = notInterestedStorage.load().map((ele) => ele.id);
    let temp = [];

    let sum = recentHistory.map((ele) =>
      notInterestedId.indexOf(ele.id) !== -1
        ? Object.assign(ele, { isNotInterest: true })
        : Object.assign(ele, { isNotInterest: false }),
    );
    const brandArr = sum
      .filter((ele) => temp.indexOf(ele.brand) === -1 && temp.push(ele.brand))
      .map((ele) => ele.brand);
    if (this.state.brand.length > 1) {
      this.setState({ data: sum, brand: [...this.state.brand]});
    } else {
      this.setState({ data: sum, brand: [...this.state.brand, ...brandArr] });
    }
  };

  componentDidMount = () => {
    const recentHistory = recentHistoryStorage.load();
    let temp = [];

    if (recentHistory && notInterestedStorage.load()) {
      this.combineData();
    } else if (recentHistory) {
      let sum = recentHistory.map((ele) => Object.assign(ele, { isNotInterest: false }));

      const brandArr = sum
        .filter((ele) => temp.indexOf(ele.brand) === -1 && temp.push(ele.brand))
        .map((ele) => ele.brand);

      this.setState({ data: sum, brand: [...this.state.brand, ...brandArr] });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    const { data } = this.state;

    if (this.state.currentSortingOpt !== prevState.currentSortingOpt) {
      switch (this.state.currentSortingOpt) {
        case '최근 조회 순':
          this.combineData();
          return;

        case '낮은 가격 순':
          const sortedLowPrice = data.sort((a, b) => a.price - b.price);
          this.setState({ data: sortedLowPrice });
          return;

        default:
          this.combineData();
          return;
      }
    }
  }

  handleCheckNotInterest = (e) => {
    const checked = e.target.checked;
    if (checked) {
      this.setState({isCheckNotInterest: true});
    } else {
      this.setState({isCheckNotInterest: false});
    }
  };

  clickHandler = (e) => {
    const target = e.target;
    const nodeName = target.nodeName.toLowerCase();

    if (nodeName === 'li') {
      if (target.dataset.notinterest === 'true') {
        this.setState({ isOpen: true });
      } else {
        this.props.history.push(`/product/${target.dataset.id}`);
      }
    }
  };

  closeHandler = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { data, brand, isCheckNotInterest } = this.state;

    return (
      <Layout>
        <ListWrap>
          <ProductListTitle>조회한 상품</ProductListTitle>
          <StyledFilterBox
            data={data}
            brand={brand}
            handleCheckNotInterest={this.handleCheckNotInterest}
            isCheckNotInterest={isCheckNotInterest}
            changeInterest={this.changeInterest}
            changeData={this.changeData}
          />
          <StyledSortingContainer>
            <ModalSortingSelector
              currentSortingOpt={this.state.currentSortingOpt}
              handleSelectSortingOpt={this.handleSelectSortingOpt}
            />
          </StyledSortingContainer>
          <ProductContainer onClick={this.clickHandler}>
          {!isCheckNotInterest ? (
            <>
              {(data || []).map((product, index) => (
                <Product
                  key={product.id}
                  title={product.title}
                  brand={product.brand}
                  price={product.price}
                  id={product.id}
                  notinterest={product.isNotInterest}
                />
              ))}
            </>
          ) : (
            <>
              {(data || []).filter((product) => !product.isNotInterest).map(product =>
                    (
                    <Product
                      key={product.id}
                      title={product.title}
                      brand={product.brand}
                      price={product.price}
                      id={product.id}
                      notinterest={product.isNotInterest}
                    />
                  )
              )}
            </>
          )}
          </ProductContainer>
        </ListWrap>
        {this.state.isOpen && createPortal(<Alert onClose={this.closeHandler} />, document.body)}
      </Layout>
    );
  }
}

export default RecentList;

const ListWrap = styled.section`
  max-width: 80rem;
  margin: 0 auto;
  padding: 3rem 6rem;
`;

const ProductListTitle = styled.h2`
  margin-bottom: 2rem;
  font-size: 3rem;
  font-weight: bold;
`;

const StyledFilterBox = styled(Filter)`
  margin-bottom: 1rem;
`;

const StyledSortingContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 1rem;
`;

const ProductContainer = styled.ul`
  max-width: 1200px;
  margin: 0 auto;
`;