import React, {Component} from 'react';
import styled from 'styled-components/macro';

const Wrapper = styled.li`
	width: 100%;
`;
const SortingOptionBtn = styled.button.attrs(({selected}) => ({
	color: selected ? 'blue' : 'red'
}))`
	color: ${({color}) => color};
`;


class SortingItem extends Component {
	render() {
		const { label, currentSortingOpt } = this.props;
		return (
			<Wrapper>
				<SortingOptionBtn selected={label === currentSortingOpt}>
					{label}
				</SortingOptionBtn>
			</Wrapper>
		);
	}
}

export default SortingItem;