/**
 * Counter Slice
 * Simple counter example using Redux Toolkit
 */

import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  value: 0,
};

// Counter slice
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // Increment counter
    increment: (state) => {
      state.value += 1;
    },
    
    // Decrement counter
    decrement: (state) => {
      state.value -= 1;
    },
    
    // Increment by amount
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
    
    // Reset counter
    reset: (state) => {
      state.value = 0;
    },
  },
});

// Export actions
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;

// Export selectors
export const selectCount = (state) => state.counter.value;

export default counterSlice.reducer; 