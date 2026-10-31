import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isLightMode: true,
    isHydrated: false,
  },
  reducers: {
    hydrateTheme(state, action) {
      state.isLightMode = action.payload;
      state.isHydrated = true;
    },
    setLightMode(state, action) {
      state.isLightMode = action.payload;
    },
  },
});

export const { hydrateTheme, setLightMode } = themeSlice.actions;
export default themeSlice.reducer;
