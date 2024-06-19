import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    prices: [],
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
            console.log(newPrices);
            state.prices = newPrices;
        },
    },
});

export default stockSlice.reducer;
export const { reset, savePrices } = stockSlice.actions;
