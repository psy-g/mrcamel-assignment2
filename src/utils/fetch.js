export const fetchData = () => {
	return fetch(`${process.env.PUBLIC_URL}/data/product.json`).then((res) => res.json());
};