import { NEWS_COUNT } from "../Constants/constants";

const API_ROOT = 'https://hacker-news.firebaseio.com/v0';

export const getItem = async id => {
    const response = await fetch(`${API_ROOT}/item/${id}.json`);

    return await response.json();
}

export const getNewsList = async () => {
    const response = await fetch(`${API_ROOT}/newstories.json?orderBy="$key"&limitToFirst=${NEWS_COUNT}`);

    if (response.ok) {
        let newsIds = await response.json();

        return Promise.all(newsIds.map(async id => getItem(id)));
    }
}

export const getNewsComments = async idsArr => (
    Promise.all(idsArr.map(async id => getItem(id)))
);