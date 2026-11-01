import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from './favoritesSlice';
import notificationsReducer from './notificationsSlice';
import themeReducer from './themeSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    theme: themeReducer,
    notifications: notificationsReducer,
  },
});
