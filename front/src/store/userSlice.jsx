import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        nickname: "",
        returns: "",
        user_pdi: 0,
        turn: 1,
        img: 1,
    },
};

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        reset: () => {
            return initialState;
        },
        saveUser: (state, action) => {
            const newUser = action.payload;
            // console.log(newUser);
            state.user = newUser;
        },
        savePdi: (state, action) => {
            const newPdi = state.user.user_pdi + action.payload;
            state.user.user_pdi = newPdi;
        },
        saveTurn: (state, action) => {
            state.user.turn += 1;
        },
    },
});

export default userSlice.reducer;
export const { reset, saveUser, savePdi, saveTurn } = userSlice.actions;
