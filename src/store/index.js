/**
 * Redux Store Configuration
 * Main store setup with Redux Toolkit - Simple Counter Example
 */

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import { userSlice } from './slices/userSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userSlice,
  },
});

export default store; 