import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import stockSlice from "./stockSlice";

export const rootReducer = combineReducers({
    stock: stockSlice,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
