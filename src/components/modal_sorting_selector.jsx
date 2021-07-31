import React, {Component} from 'react';
import styled from 'styled-components/macro';

import Modal from 'components/modal';
import SortingItem from "components/sorting_item";
import {sortingOptions} from "utils/constant";

class ModalSortingSelector extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		const { currentSortingOpt, handleSelectSortingOpt, className } = this.props;
		return (
			<Modal
				label="상품정렬 옵션 선택 모달"
				trigger={
					({handleOpen, isOpen}) => (
						<OpenerBtn
							className={className}
							aria-haspopup="true"
							aria-pressed={ isOpen }
							onClick={ handleOpen }
						>
							정렬: {currentSortingOpt}
						</OpenerBtn>
					)
				}
			>
				<SortingList onClick={handleSelectSortingOpt}>
					{

						Object.keys(sortingOptions).map(item => (
							<SortingItem
								key={sortingOptions[item].desc}
								label={sortingOptions[item].desc}
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

const OpenerBtn = styled.button`
  width: 15rem;
  height: 3rem;
  border: 1px solid #1b25f0;
  padding: .5rem;
	font-weight: 600;
	color: #1b25f0;
`;
const SortingList = styled.ul`
	width: 100%;
`
