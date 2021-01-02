import { NEWS_COUNT } from "../Constants/constants";
import { ItemType } from "../Types/types";

const API_ROOT = 'https://hacker-news.firebaseio.com/v0';

export const getItem = async (id: string): Promise<ItemType> => {
    const response = await fetch(`${API_ROOT}/item/${id}.json`);
    const item = await response.json();

    return item;
}

export const getNewsList = async (): Promise<ItemType[]> => {
    const response = await fetch(`${API_ROOT}/newstories.json?orderBy="$key"&limitToFirst=${NEWS_COUNT}`);

    let newsIds: string[] = await response.json();

    return Promise.all(newsIds.map(async (id) => getItem(id)));
}

export const getNewsComments = async (idsArr: string[]): Promise<ItemType[]> => (
    Promise.all(idsArr.map(async (id) => getItem(id)))
);