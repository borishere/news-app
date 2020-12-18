import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { getItem, getNewsList } from '../../app/Api/api';

const newsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.time - a.time
})

const initialState = newsAdapter.getInitialState({
    loading: 'idle'
});

export const fetchNewsList = createAsyncThunk(
    'news/fetchNewsList',
    async () => {
        const newsList = await getNewsList();

        return newsList.filter(news => news && !news.error && !news.deleted);
    }
);

export const fetchNewsItem = createAsyncThunk(
    'news/fetchNewsItem',
    async id => {
        const newsItem = await getItem(id);

        if (newsItem) {
            return newsItem;
        }

        throw new Error();
    }
);

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {

    },
    extraReducers: {
        [fetchNewsList.pending]: state => {
            state.loading = 'loading';
        },

        [fetchNewsList.fulfilled]: (state, action) => {
            state.loading = 'succeeded';

            newsAdapter.upsertMany(state, action.payload);
        },

        [fetchNewsList.rejected]: state => {
            state.loading = 'failed';
        },

        [fetchNewsItem.fulfilled]: newsAdapter.upsertOne
    }
});

export const { selectAll, selectById } = newsAdapter.getSelectors(state => state.newsList);

export default newsSlice.reducer;