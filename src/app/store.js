import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "../features/News/newsSlice";
import CommentsReducer from "../features/Comments/CommentsSlice";

export default configureStore({
    reducer: {
        newsList: newsReducer,
        comments: CommentsReducer
    }
});