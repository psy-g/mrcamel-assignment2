import React, { Component } from "react";
import styled from "styled-components";

const ProductWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 1rem;
  background-color: #dfe6ed;
  border-radius: 5px;
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
`;

class Product extends Component {
  render() {
    return (
      <ProductWrap>
        <ProductContent>Title: {this.props.title}</ProductContent>
        <ProductContent>Brand: {this.props.brand}</ProductContent>
        <ProductContent>Price: {this.props.price}</ProductContent>
        {this.props.id && <ProductInteresting>관심없음</ProductInteresting>}
      </ProductWrap>
    );
  }
}

export default Product;
