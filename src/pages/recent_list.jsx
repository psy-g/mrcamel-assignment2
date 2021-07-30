import React, {Component} from "react";

import Layout from "components/layout";
import Filter from "components/Filter";
import ModalSortingSelector from "components/modal_sorting_selector";

class RecentList extends Component {
	render() {
		return (
			<Layout>
				<Filter />
				<ModalSortingSelector />
			</Layout>
		);
	}
}

export default RecentList;