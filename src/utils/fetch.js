export const getData = () => {
	return fetch(`${process.env.PUBLIC_URL}/data/product.json`).then((res) => res.json());
};