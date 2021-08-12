import React, { Component } from 'react';
import styled from 'styled-components/macro';

class Product extends Component {
  render() {
    const { id, notinterest, title, brand, price } = this.props;

    return (
      <ProductWrap data-id={id} data-notinterest={notinterest}>
        <ProductContent>Title: {title}</ProductContent>
        <ProductContent>Brand: {brand}</ProductContent>
        <ProductContent>Price: {price}</ProductContent>
        {notinterest && <ProductInteresting>관심없음</ProductInteresting>}
      </ProductWrap>
    );
  }
}

const ProductWrap = styled.li`
  position: relative;
  height: 100%;
  padding: 1rem;
  background-color: #dfe6ed;
  border-radius: 5px;
  margin-top: 2rem;
  cursor: pointer;
`;

const ProductContent = styled.p`
  font-size: 2rem;
  pointer-events: none;
  margin: 0.5rem;
`;

const ProductInteresting = styled.p`
  position: absolute;
  font-size: 3rem;
  right: 30px;
  top: 35px;
  pointer-events: none;
`;
export default Product;
