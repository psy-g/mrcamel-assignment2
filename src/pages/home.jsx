import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Layout from 'components/layout';
import Product from 'components/product/product';

const API = 'http://localhost:3000/data/product.json';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount = () => {
    fetch(API)
      .then((res) => res.json())
      .then((res) => {
        this.setState({ products: res });
        localStorage.setItem('items', JSON.stringify(this.state.products));
      });
    JSON.parse(localStorage.getItem('d'));
  };

  render() {
    const products = JSON.parse(localStorage.getItem('items'));
    return (
      <Layout>
        <ListWrap>
          <ProductListTitle>상품 목록</ProductListTitle>
          {products.map((product) =>
            !product.check ? (
              <Link to={`/product/${product.id}`} key={product.id}>
                <Product
                  key={product.id}
                  title={product.title}
                  brand={product.brand}
                  price={product.price}
                  id={product.id}
                />
              </Link>
            ) : (
              <Product
                key={product.id}
                title={product.title}
                brand={product.brand}
                price={product.price}
                interest={product.interest}
              />
            ),
          )}
        </ListWrap>
      </Layout>
    );
  }
}
const ListWrap = styled.div`
  padding: 3rem 6rem;
`;

const ProductListTitle = styled.p`
  font-size: 3rem;
  font-weight: bold;
`;

export default Home;
