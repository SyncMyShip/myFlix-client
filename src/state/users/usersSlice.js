import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("user"));
const storedToken = localStorage.getItem("token");

const initialState = {
    user: storedUser ? storedUser : null,
    token: storedToken ? storedToken : null
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const user = action.payload;
            localStorage.setItem("user", JSON.stringify(user));
            state.user = user;
        },
        setToken: (state, action) => {
            const token = action.payload;
            localStorage.setItem("token", token)
            state.token = token;
        },
        onLoggedOut: (state) => {
            state.user = null;
            state.token = null;
            localStorage.clear();
        }
    }
});

export const { setUser, setToken, onLoggedOut } = usersSlice.actions;

export default usersSlice.reducer;
