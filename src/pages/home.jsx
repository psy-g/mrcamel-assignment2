import React, {Component} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";

import Layout from 'components/layout';
import Product from "components/product/product";
import Modal from "components/modal/modal";

const API = "http://localhost:3000/data/product.json";

const ListWrap = styled.div`
  padding: 3rem 6rem;
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
			.then((res) => this.setState({products: res}));
	};

	render() {
		const {products} = this.state;

		return (
			<Layout>
				<ListWrap>
					<ProductListTitle>상품 목록</ProductListTitle>
					{products.map((product) =>
						!product.check ? (
							<Link to={`/product/${product.id}`} key={product.id}>
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
			</Layout>
		);
	}
}

export default Home;
