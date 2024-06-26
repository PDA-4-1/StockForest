import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    prices: [],
    stockList: [],
    selectedStock: null,
    bgmOn: true,
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
        saveSelectedStock: (state, action) => {
            const selectedStock = action.payload;
            state.selectedStock = selectedStock;
        },
        setBgm: (state, action) => {
            state.bgmOn = !state.bgmOn;
        },
    },
});

export default stockSlice.reducer;
export const { reset, savePrices, saveSelectedStock, saveStockList, setBgm } = stockSlice.actions;
