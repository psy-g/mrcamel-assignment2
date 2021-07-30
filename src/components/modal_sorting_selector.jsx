import React, {Component} from 'react';
import styled from 'styled-components/macro';

import Modal from 'components/modal';
import SortingItem from "components/sorting_item";

const OpenerBtn = styled.button`
	width: 10rem;
	border: 1px solid #333;
	text-align: center;
`;
const SortingList = styled.ul`
	width: 100%;
`

const sortingOptions = ['최근 조회 순', '낮은 가격 순'];

class ModalSortingSelector extends Component {

	constructor(props) {
		super(props);
		this.state ={
			currentSortingOpt: sortingOptions[0],
		};
	}

	handleSelectSortingOpt = e =>  {
		const target = e.target;
		const nodeName = target.nodeName.toLowerCase();

		if (nodeName === 'button') {
			this.setState({currentSortingOpt: target.innerText});
		}
	}

	render() {
		const { currentSortingOpt } = this.state;

		return (
			<Modal
				id="sortingSelector"
				trigger={
					({handleOpen, isOpen}) => (
						<OpenerBtn
							aria-haspopup="true"
							aria-pressed={ isOpen }
							onClick={ handleOpen }
						>
							정렬버튼
						</OpenerBtn>
					)
				}
			>
				<SortingList onClick={this.handleSelectSortingOpt}>
					{
						sortingOptions.map(item => (
							<SortingItem
								key={item}
								label={item}
								currentSortingOpt={currentSortingOpt}
							/>
						))
					}
				</SortingList>
			</Modal>
		);
	}
}

export default ModalSortingSelector;