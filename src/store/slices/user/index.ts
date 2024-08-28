import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    initialState: { id: "", name: "", email: "", city: "", mobile: "" },
    name: 'user',
    reducers: {
        setUser: (state, action) => {
            state = action.payload;
            return state;
        },
        removeUser: (state) => {
            state = { id: "", name: "", email: "", city: "", mobile: "" };
            return state;
        }
    }
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;