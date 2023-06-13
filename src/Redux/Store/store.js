// store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../Slice/counterSlice";
import { eventReducer } from "../Slice/eventSlice";
import { categoryReducer } from "../Slice/categorySlice";
const store = configureStore({
  reducer: {
    counter: counterReducer,
    event: eventReducer,
    category: categoryReducer,
  },
});

export default store;
