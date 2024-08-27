import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./movies/moviesSlice"
import usersReducer from "./users/usersSlice";

export const store = configureStore({
    reducer: { 
        movies: moviesReducer,
        user: usersReducer 
    }
});