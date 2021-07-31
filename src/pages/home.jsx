import React, { Component } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';

import Layout from 'components/layout';
import Product from 'components/product/product';
import { fetchData, getNotInterestedId } from 'utils';
import Modal from 'components/modal/modal';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      products: [],
    };
  }

  componentDidMount = () => {
    fetchData().then((res) => {
      this.setState({ products: res });
    });
  };
  clickHandler = (e) => {
    const target = e.target;
    const nodeName = target.nodeName.toLowerCase();

    if (nodeName === 'li') {
      if (target.dataset.notinterest) {
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
    return (
      <Layout>
        <ListWrap>
          <ProductListTitle>상품 목록</ProductListTitle>
          <ProductContainer onClick={this.clickHandler}>
            {this.state.products.map((product) =>
              !getNotInterestedId().includes(String(product.id)) ? (
                <Product
                  key={product.id}
                  title={product.title}
                  brand={product.brand}
                  price={product.price}
                  id={product.id}
                />
              ) : (
                <Product
                  key={product.id}
                  title={product.title}
                  brand={product.brand}
                  price={product.price}
                  notinterest={getNotInterestedId().includes(String(product.id))}
                />
              ),
            )}
          </ProductContainer>
        </ListWrap>
        {this.state.isOpen && createPortal(<Modal onClose={this.closeHandler} />, document.body)}
      </Layout>
    );
  }
}
const ListWrap = styled.div`
  padding: 3rem 6rem;
`;

const ProductContainer = styled.ul`
  max-width: 800px;
  margin: 0 auto;
`;

const ProductListTitle = styled.p`
  font-size: 3rem;
  font-weight: bold;
`;

export default Home;
