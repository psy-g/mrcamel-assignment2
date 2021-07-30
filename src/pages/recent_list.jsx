import React, { Component } from "react";
import styled from "styled-components";

import Layout from "components/layout";
import Filter from "components/filter";
import ModalSortingSelector from "components/modal_sorting_selector";
import {SORTING_OPTIONS} from "utils/constant";

class RecentList extends Component {
  constructor(props) {
    super(props);
    this.state ={
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

  render() {
    return (
      <Layout>
        <ListWrap>
          <ProductListTitle>조회한 상품</ProductListTitle>
          <Filter />
          <ModalSortingSelector
            currentSortingOpt={this.state.currentSortingOpt}
            handleSelectSortingOpt={this.handleSelectSortingOpt}
          />
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
