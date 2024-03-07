import { createSlice } from "@reduxjs/toolkit";

let counterSlice = createSlice({
  name: "Counter",
  initialState: {
    counter: 0,
  },
  reducers: {
    increase: (state) => {
      state.counter += 1;
    },
    decrease: (state) => {
      state.counter -= 1;
    },
    increaseByValue: (state, action) => {
      console.log(action);
      state.counter += action.payload;
    },
  },
});

export let CounterReducer = counterSlice.reducer;

export let { increase, decrease, increaseByValue } = counterSlice.actions;
