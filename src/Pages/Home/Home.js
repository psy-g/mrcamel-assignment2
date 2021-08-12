import React, { Component } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';

import Layout from 'Layout';
import Product from 'Components/Product/Product';
import Alert from 'Components/Alert/Alert';
import { fetchData, getNotInterestedId } from 'Utils';

import { ROUTES, MENU } from 'Constants/Constant';

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
        this.props.history.push(`${ROUTES.PRODUCT}/${target.dataset.id}`);
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
          <ProductListTitle>{MENU.PRODUCT_LIST}</ProductListTitle>
          <ul onClick={this.clickHandler}>
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
          </ul>
        </ListWrap>
        {this.state.isOpen && createPortal(<Alert onClose={this.closeHandler} />, document.body)}
      </Layout>
    );
  }
}
const ListWrap = styled.section`
  padding: 3rem 6rem;
  max-width: 800px;
  margin: 0 auto;
`;

const ProductListTitle = styled.h2`
  font-size: 3rem;
  font-weight: bold;
`;

export default Home;
