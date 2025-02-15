import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setMovies: (state, action) => {
            return action.payload
        },
        setMovieFilter: (state, action) => {
            state.filter = action.payload;
        }
    }
});

export const { setMovies, setMovieFilter } = moviesSlice.actions;

export default moviesSlice.reducer;
