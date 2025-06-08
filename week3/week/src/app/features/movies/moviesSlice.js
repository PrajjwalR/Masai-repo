import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'your_api_key_here';

export const fetchMoviesBySearch = createAsyncThunk(
  'movies/fetchBySearch',
  async (searchTerm, thunkAPI) => {
    try {
      const res = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`);
      if (res.data.Response === 'False') throw new Error(res.data.Error);
      return res.data.Search;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    loading: false,
    error: null,
    favorites: [],
    selectedMovie: null
  },
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(movie => movie.imdbID !== action.payload);
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchMoviesBySearch.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesBySearch.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMoviesBySearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { addFavorite, removeFavorite } = moviesSlice.actions;
export default moviesSlice.reducer;
