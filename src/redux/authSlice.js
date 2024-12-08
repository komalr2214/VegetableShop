import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    userData: null, // This will hold session data, including the username
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.userData = action.payload; // Store user data (e.g., username)
    },
    logout(state) {
      state.isLoggedIn = false;
      state.userData = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
