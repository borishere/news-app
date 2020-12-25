import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { getItem, getNewsList, ItemType } from '../../app/Api/api';
import { RootState } from '../../app/store';

const newsAdapter = createEntityAdapter<ItemType>({
    sortComparer: (a, b) => +b.time - +a.time
});

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
    async (id: string) => {
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
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchNewsList.pending, state => {
            state.loading = 'loading';
        });

        builder.addCase(fetchNewsList.fulfilled, (state, action) => {
            state.loading = 'succeeded';

            newsAdapter.upsertMany(state, action.payload);
        });

        builder.addCase(fetchNewsList.rejected, (state, action) => {
            state.loading = 'failed';
        });

        builder.addCase(fetchNewsItem.fulfilled, (state, action) => {
            // newsAdapter.upsertOne
        });
    }
});

export const { selectAll, selectById } = newsAdapter.getSelectors<RootState>(state => state.newsList);

export default newsSlice.reducer;
