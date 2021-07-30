import React, { Component } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Layout from 'components/layout';
import Product from "components/product/Product";
import Modal from "components/modal/Modal";

const API = "http://localhost:3000/data/product.json";

const ListWrap = styled.div`
  padding: 3rem 5rem;
`;

const ProductListTitle = styled.p`
  font-size: 3rem;
  font-weight: bold;
`;

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
      .then((res) => this.setState({ products: res }));
  };
  render() {
    const { products } = this.state;

    return (
      <Layout>
        <ListWrap>
          <ProductListTitle>상품 목록</ProductListTitle>
          {products.map((product) => (
            <Link to={`/detail/${product.id}`} key={product.id}>
              <Product
                title={product.title}
                barnd={product.brand}
                price={product.price}
                id={product.id}
              />
            </Link>
          ))}
        </ListWrap>
      </Layout>
    );
  }
}

export default Home;
