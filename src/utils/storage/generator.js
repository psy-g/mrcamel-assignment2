export default class Storage {
	constructor(title) {
		this.title = title;
	};

	save = (list = []) => {
		return localStorage.setItem(this.title, JSON.stringify(list));
	};

	load = () => JSON.parse(localStorage.getItem(this.title));
}

