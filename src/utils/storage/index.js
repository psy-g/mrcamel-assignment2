import Storage from 'utils/storage/generator';
import { localStorageTitle } from "utils/constant";

export const notInterestedStorage = new Storage(localStorageTitle.NOT_INTERESTED.name);
export const recentHistoryStorage = new Storage(localStorageTitle.RECENT_INQUIRY_HISTORY.name);


// 현재 localStorage에 저장된 조회된 상품 중 "관심없음"인 상품의 id 배열
export const getNotInterestedId = () => {
	if (!notInterestedStorage.load()) {
		return [];
	}

	return notInterestedStorage.load()
		.filter(product => !product.interest)
		.map(product => product.id);
}