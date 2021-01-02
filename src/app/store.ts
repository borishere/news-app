import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "../features/News/newsSlice";
import CommentsReducer from "../features/Comments/CommentsSlice";
import { useDispatch } from "react-redux";

const store = configureStore({
    reducer: {
        newsList: newsReducer,
        comments: CommentsReducer
    }
});

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>

export default store;