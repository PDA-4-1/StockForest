import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    prices: [],
    stockList: [],
};

const stockSlice = createSlice({
    name: "stockSlice",
    initialState,
    reducers: {
        reset: () => {
            return initialState;
        },
        savePrices: (state, action) => {
            const newPrices = action.payload;
            // console.log(newPrices);
            state.prices = newPrices;
        },
        saveStockList: (state, action) => {
            const newStockList = action.payload;
            state.stockList = newStockList;
        },
    },
});

export default stockSlice.reducer;
export const { reset, savePrices, saveStockList } = stockSlice.actions;
