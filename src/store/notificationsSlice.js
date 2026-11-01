import { createSlice } from '@reduxjs/toolkit';

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: { enabled: false },
  reducers: {
    setNotificationsEnabled(state, action) {
      state.enabled = action.payload;
    },
  },
});

export const { setNotificationsEnabled } = notificationsSlice.actions;
export default notificationsSlice.reducer;
