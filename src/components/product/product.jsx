import React, { Component } from 'react';
import styled from 'styled-components/macro';

class Product extends Component {
  render() {
    return (
      <ProductWrap data-id={this.props.id} data-notinterest={this.props.notinterest}>
        <ProductContent>Title: {this.props.title}</ProductContent>
        <ProductContent>Brand: {this.props.brand}</ProductContent>
        <ProductContent>Price: {this.props.price}</ProductContent>
        {this.props.notinterest && <ProductInteresting>관심없음</ProductInteresting>}
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
`;
export default Product;
