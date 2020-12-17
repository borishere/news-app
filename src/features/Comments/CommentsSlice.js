import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { getNewsComments } from '../../app/Api/api';

const commentsAdapter = createEntityAdapter({
    sortComparer: (a, b) => b.time - a.time
});

const initialState = commentsAdapter.getInitialState();

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async idsArr => {
        let comments = await getNewsComments(idsArr);

        return comments.filter(comment => comment && !comment.error && !comment.deleted);
    }
);

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchComments.fulfilled]: (state, action) => {
            commentsAdapter.upsertMany(state, action.payload);
        }
    }
});

export const {
    selectAll: selectAllComments,
    selectById: selectCommentById
} = commentsAdapter.getSelectors(state => state.comments);

export default commentsSlice.reducer;
