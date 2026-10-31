import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { items: [] },
  reducers: {
    setFavorites(state, action) {
      state.items = action.payload;
    },
    toggleFavorite(state, action) {
      const workout = action.payload;
      const index = state.items.findIndex((item) => item.id === workout.id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(workout);
      }
    },
  },
});

export const { setFavorites, toggleFavorite } = favoritesSlice.actions;
export const selectIsFavorite = (id) => (state) =>
  state.favorites.items.some((item) => item.id === id);
export default favoritesSlice.reducer;
