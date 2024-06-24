import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import stockSlice from "./stockSlice";
import userSlice from "./userSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

export const rootReducer = combineReducers({
    stock: stockSlice,
    user: userSlice,
});

// persist 설정
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user"], // user slice만 persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
