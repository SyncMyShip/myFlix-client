import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setMovies: (state, action) => {
            return action.payload
        }
    }
});

export const { setMovies } = moviesSlice.actions;

export default moviesSlice.reducer;
