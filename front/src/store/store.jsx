import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import stockSlice from "./stockSlice";
import userSlice from "./userSlice";

export const rootReducer = combineReducers({
    stock: stockSlice,
    user: userSlice,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
