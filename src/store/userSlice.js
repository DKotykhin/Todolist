import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    userdata: {}
};


const UserSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        createUser: (state, action) => {
            state.userdata = action.payload;
        },
        removeUser: (state) => {
            state.userdata = {}
        }
    },

});

const { actions, reducer } = UserSlice;

export default reducer;
export const {
    createUser,
    removeUser,
} = actions;