import React, { Component } from "react";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

import Product from "components/product/product";

const API = "http://localhost:3000/data/product.json";

const ListWrap = styled.div`
  padding: 3rem 5rem;
`;

const ProductListTitle = styled.p`
  font-size: 3rem;
  font-weight: bold;
`;

class Home extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      openModal: false,
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
      <ListWrap>
        <ProductListTitle>상품 목록</ProductListTitle>
        {products.map((product) =>
          !product.check ? (
            <Link to={`/detail/${product.id}`} key={product.id}>
              <Product
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
              check={product.check}
              openModal={this.openModal}
              setState={this.setState}
            />
          )
        )}
      </ListWrap>
    );
  }
}

export default Home;
