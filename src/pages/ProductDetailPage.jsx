import React, { Component } from "react";
import styled from "styled-components";

class ProductDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      product: {},
    };
  }

  componentDidMount() {
    // make fetch request
    fetch("http://localhost:3000/data/product.json")
      .then((res) => res.json())
      .then((res) => this.setState({ products: res, product: res[this.props.match.params.id - 1] }));
  }

  randomProduct = () => {
    const currentProductId = this.state.product.id;

    const avaliableProductIds = this.state.products.map((product) => product.id);
    avaliableProductIds.splice(avaliableProductIds.indexOf(currentProductId), 1);

    const randomId = avaliableProductIds[Math.floor(Math.random() * avaliableProductIds.length)];
    console.log(avaliableProductIds, randomId);

    this.props.history.push(`/product/${randomId}`);

    this.setState({ product: this.state.products[randomId - 1] });
  };

  render() {
    const { product } = this.state;
    return (
      <div>
        <OutlineButton>목록으로 돌아가기</OutlineButton>
        <ProductCard>
          <Logo>image</Logo>
          <ProductInfo>
            <h2>{product.title}</h2>
            <h2>{product.price}원</h2>
            <div>
              <Brand>{product.brand}</Brand>
            </div>
            <div>
              <Button onClick={this.randomProduct}>관심 없음</Button>
              <Button onClick={this.randomProduct}>랜덤 상품 조회</Button>
            </div>
          </ProductInfo>
        </ProductCard>
      </div>
    );
  }
}

export default ProductDetailPage;

const ProductCard = styled.div`
  display: flex;
  flex: 1 auto;
  justify-content: space-between;

  padding: 30px;

  border: 1px blue solid;
  width: 800px;

  h2 {
    font-size: 2rem;
    font-weight: 700;
    text-align: right;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: right;
  padding: 10px 0;
`;

const Brand = styled.span`
  border: #c4c4c4 1px solid;
  border-radius: 2rem;
  font-size: 1.5rem;
  padding: 10px 20px;
`;

const Logo = styled.div`
  width: 250px;
  height: 250px;
  background: #c4c4c4;

  margin: 0 30px 0 0;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 5rem;
`;

const Button = styled.button`
  width: 200px;
  background: #2d3ff3;
  border-radius: 3px;
  margin-left: 10px;
  padding: 5px;
  color: white;

  :hover {
    background: #0e18f0;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
`;

const OutlineButton = styled(Button)`
  position: relative;
  margin: 10px 0;
  background: white;
  border: #2d3ff3 1px solid;
  color: #2d3ff3;

  :hover {
    background: white;
  }
`;
