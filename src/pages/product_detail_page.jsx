import React, { Component } from "react";
import styled from "styled-components";
import Layout from "components/layout";
import { fetchData, getNotInterestedId } from "utils/utils";

class ProductDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      product: {},
      undefined: false,
    };
  }

  addStorage = (product) => {
    const getSelected = JSON.parse(localStorage.getItem("selected"));
    if (getSelected.includes(product)) {
      // getSelected에서 product 제거
      const existIndex = getSelected.findIndex((el) => el.id === product.id);
      getSelected.splice(existIndex, 1);
    }
    localStorage.setItem(
      "selected",
      JSON.stringify([...getSelected, { ...product, interest: true }])
    );
  };

  componentDidMount() {
    fetchData().then((res) => {
      this.setState({
        products: res,
        product: res[this.props.match.params.id - 1],
      });
      this.addStorage(res[this.props.match.params.id - 1]);
    });
  }

  randomProduct = () => {
    // 관심없음 상품, 현 상품 제외하고 랜덤 상품 id 생성
    const notInterestedId = getNotInterestedId();
    const currentProductId = this.state.product.id;
    const avaliableProductIds = this.state.products
      .map((product) => product.id)
      .filter((id) => !notInterestedId.includes(id) && id !== currentProductId);
    const randomId =
      avaliableProductIds[
        Math.floor(Math.random() * avaliableProductIds.length)
      ];

    // 랜덤 상품으로 이동
    this.props.history.push(`/product/${randomId}`);
    this.setState({ product: this.state.products[randomId - 1] });
    // // localStroage에 조회된 상품 추가
    this.addStorage(this.state.products[randomId - 1]);
  };

  setNotInterested = (product) => {
    // localStrage에 조회된 상품에서 상품을 조회 -> 상품 제거 -> interest: false 로 변경 후 상품 다시 추가
    const getSelected = JSON.parse(localStorage.getItem("selected"));
    const newSelected = getSelected.filter((el) => el.id !== product.id);
    newSelected.push({ ...product, interest: false });
    localStorage.setItem("selected", JSON.stringify(newSelected));

    this.randomProduct();
  };

  render() {
    const { product } = this.state;
    return (
      <Layout>
        <Container>
          <OutlineButton
            onClick={() => {
              this.props.history.push("/");
            }}
          >
            목록으로 돌아가기
          </OutlineButton>
          <ProductCard>
            <Logo>image</Logo>
            <ProductInfo>
              <Title>{product.title}</Title>
              <Price>{product.price}원</Price>
              <div>
                <Brand>{product.brand}</Brand>
              </div>
              <div>
                <Button onClick={() => this.setNotInterested(product)}>
                  관심 없음
                </Button>
                <Button onClick={this.randomProduct}>랜덤 상품 조회</Button>
              </div>
            </ProductInfo>
          </ProductCard>
        </Container>
      </Layout>
    );
  }
}

export default ProductDetailPage;

const Container = styled.div`
  width: 80rem;
  margin: 3rem auto;
  text-align: right;
`;

const ProductCard = styled.div`
  display: flex;
  flex: 1 auto;
  justify-content: space-between;

  padding: 3rem;

  border: 1px blue solid;
  width: 80rem;
`;

const Title = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  text-align: right;
`;

const Price = styled(Title)`
  font-size: 2rem;
`;

const ProductInfo = styled.div`
  width: 55rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: right;
  padding: 1rem 0;
`;

const Brand = styled.span`
  border: #c4c4c4 1px solid;
  border-radius: 2rem;
  font-size: 1.5rem;
  padding: 1rem 2rem;
`;

const Logo = styled.div`
  width: 25rem;
  height: 25rem;
  background: #c4c4c4;

  margin: 0 30px 0 0;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 5rem;
`;

const Button = styled.button`
  width: 20rem;
  background: #2d3ff3;
  border-radius: 0.3rem;
  margin-left: 1rem;
  padding: 0.5rem;
  color: white;

  :hover {
    background: #0e18f0;
    box-shadow: 0px 0.5rem 1rem rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 0px 0.5rem 1rem rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0px 0.5rem 1rem rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }
`;

const OutlineButton = styled(Button)`
  position: relative;
  margin: 1rem 0;
  background: white;
  border: #2d3ff3 0.1rem solid;
  color: #2d3ff3;

  :hover {
    background: white;
  }
`;
