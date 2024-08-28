import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
const storedToken = localStorage.getItem("token") || null;

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
        setFavoriteMovies: (state, action) => {
            state.user.FavoriteMovies = action.payload;
        },
        onLoggedOut: (state) => {
            state.user = null;
            state.token = null;
            localStorage.clear();
        }
    }
});

export const { setUser, setToken, setFavoriteMovies, onLoggedOut } = usersSlice.actions;

export default usersSlice.reducer;
