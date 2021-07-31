export default class Storage {
	constructor(title) {
		this.title = title;
	};

	save = (list = []) => {
		const obj = {
			data: list,
			woong: '',
		}
		return localStorage.setItem(this.title, JSON.stringify(obj));
	};

	load = () => JSON.parse(localStorage.getItem(this.title))?.data;
}

