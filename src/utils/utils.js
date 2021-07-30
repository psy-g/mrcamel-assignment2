// 전체 상품 100개 fetch
export const fetchData = () => {
  return fetch("http://localhost:3000/data/product.json").then((res) =>
    res.json()
  );
};

// 현재 localStorage에 저장된 조회된 상품 중 "관심없음"인 상품의 id 배열
export const getNotInterestedId = () => {
  const getSelected = JSON.parse(localStorage.getItem("selected"));
  const notInterestedId = getSelected
    .filter((product) => {
      return !product.interest;
    })
    .map((product) => product.id);
  return notInterestedId;
};

export default getNotInterestedId;
