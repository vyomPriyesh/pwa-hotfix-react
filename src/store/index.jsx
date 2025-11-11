import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/auth";
import dropdownReducer from './slice/dropdown'

const reducer = {
  auth: authReducer,
  dropdown: dropdownReducer,
};

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;
