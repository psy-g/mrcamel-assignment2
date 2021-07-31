import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Layout from 'components/layout';
import Product from 'components/product/product';
import { fetchData, getNotInterestedId } from 'utils/utils';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
  }

  componentDidMount = () => {

    fetchData().then((res) => {
      this.setState({ products: res });
    });
  };

  render() {
    const { products } = this.state;
    return (
      <Layout>
        <ListWrap>
          <ProductListTitle>상품 목록</ProductListTitle>
          {this.state.products.map((product, index) =>
            !getNotInterestedId().includes(String(product.id)) ? (
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
                notInterest={getNotInterestedId().includes(String(product.id))}
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
