import React, { Component } from "react";
import styled from "styled-components";

import Layout from "components/layout";
import Filter from "components/Filter";
import ModalSortingSelector from "components/modal_sorting_selector";

class RecentList extends Component {
  render() {
    return (
      <Layout>
        <ListWrap>
          <ProductListTitle>조회한 상품</ProductListTitle>
          <Filter />
          <ModalSortingSelector />
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
