import Storage from 'utils/storage/generator';
import { localStorageTitle } from "utils/constant";

export const notInterestedStorage = new Storage(localStorageTitle.NOT_INTERESTED.name);
export const recentHistoryStorage = new Storage(localStorageTitle.RECENT_INQUIRY_HISTORY.name);