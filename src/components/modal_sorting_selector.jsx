import React, {Component} from 'react';
import styled from 'styled-components/macro';

import Modal from 'components/modal';
import SortingItem from "components/sorting_item";
import {sortingOptions} from "utils/constant";

const OpenerBtn = styled.button`
	width: 10rem;
	border: 1px solid #333;
	text-align: center;
`;
const SortingList = styled.ul`
	width: 100%;
`


class ModalSortingSelector extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { currentSortingOpt, handleSelectSortingOpt } = this.props;

		return (
			<Modal
				label="상품정렬 옵션 선택 모달"
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
				<SortingList onClick={handleSelectSortingOpt}>
					{
						Object.keys(sortingOptions).map(item => (
							<SortingItem
								key={item.desc}
								label={item.desc}
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