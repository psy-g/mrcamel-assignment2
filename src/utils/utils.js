export const BASE_URL = 'http://localhost:3000';

// 전체상품 데이터 100개 fetch
export const fetchData = () => {
  return fetch( `${ process.env.PUBLIC_URL }/data/product.json`).then((res) => res.json());
};

// 현재 localStorage에 저장된 조회된 상품 중 "관심없음"인 상품의 id 배열
export const getNotInterestedId = () => {
  const getSelected = JSON.parse(localStorage.getItem('selected'));
  const notInterestedId = getSelected
    .filter((product) => {
      return !product.interest;
    })
    .map((product) => product.id);
  return notInterestedId;
};

// 조회된 상품 localStorage에서 가져오기
export const getSelected = () => {
  return JSON.parse(localStorage.getItem('selected'));
};

// 조회된 상품 LocalStorage에 추가하기
export const setSelected = (items) => {
  localStorage.setItem('selected', JSON.stringify(items));
};
