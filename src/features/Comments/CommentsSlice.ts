import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { getNewsComments} from '../../app/Api/api';
import { RootState } from '../../app/store';
import { CommentType } from '../../app/Types/types';

const commentsAdapter = createEntityAdapter<CommentType>({
    sortComparer: (a, b) => b.time - a.time
});

const initialState = commentsAdapter.getInitialState();

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async (idsArr: string[]) => {
        let comments = await getNewsComments(idsArr);

        return comments.filter(comment => comment && !comment.error && !comment.deleted);
    }
);

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            commentsAdapter.upsertMany(state, action.payload);
        });
    }
});

export const {
    selectAll: selectAllComments,
    selectById: selectCommentById
} = commentsAdapter.getSelectors((state: RootState) => state.comments);

export default commentsSlice.reducer;
