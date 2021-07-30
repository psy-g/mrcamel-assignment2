import React, { Component } from "react";
import styled from "styled-components/macro";

class Product extends Component {
  render() {
    return (
      <ProductWrap check={this.props.check}>
        <ProductContent>Title: {this.props.title}</ProductContent>
        <ProductContent>Brand: {this.props.brand}</ProductContent>
        <ProductContent>Price: {this.props.price}</ProductContent>
        {!this.props.interest && (
          <ProductInteresting>관심없음</ProductInteresting>
        )}
      </ProductWrap>
    );
  }
}
const ProductWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 1rem;
  background-color: #dfe6ed;
  border-radius: 5px;
  margin-top: 2rem;
  cursor: ${(props) => props.check && "pointer"};
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
export default Product;
