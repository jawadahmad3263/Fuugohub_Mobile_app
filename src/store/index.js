/**
 * Redux Store Configuration
 * Main store setup with Redux Toolkit - Simple Counter Example
 */

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store; 