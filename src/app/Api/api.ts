import { NEWS_COUNT } from "../Constants/constants";

const API_ROOT = 'https://hacker-news.firebaseio.com/v0';

export type ItemType = {
    id: number
    deleted?: boolean
    type: 'job' | 'story' | 'comment' | 'poll' | 'pollopt'
    by: string
    time: number
    text: string
    dead?: boolean
    parent: number
    poll?: number
    kids: string[]
    url: string
    score: number
    title: string
    parts?: number[]
    descendants: number,
    error?: any
};

export const getItem = async (id: string): Promise<ItemType> => {
    const response = await fetch(`${API_ROOT}/item/${id}.json`);
    const item = await response.json();

    return item;
}

export const getNewsList = async (): Promise<ItemType[]> => {
    const response = await fetch(`${API_ROOT}/beststories.json?orderBy="$key"&limitToFirst=${NEWS_COUNT}`);

    let newsIds: string[] = await response.json();

    return Promise.all(newsIds.map(async (id) => getItem(id)));
}

export const getNewsComments = async (idsArr: string[]): Promise<ItemType[]> => (
    Promise.all(idsArr.map(async (id) => getItem(id)))
);