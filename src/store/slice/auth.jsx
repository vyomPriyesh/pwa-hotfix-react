import AuthService from "../../service/auth.service";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { get } from "lodash";

export const login = createAsyncThunk(
  "login",
  async (requestObj, thunkAPI) => {
    try {
      const response = await AuthService.login(requestObj);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        get(error, "response.data.message", error)
      );
    }
  }
);

const initialState = {
  loading: false,
  token: null,
  error: false,
  user: null,
  isLoggedIn: !!JSON.parse(localStorage.getItem("isLoggedIn")),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

const { reducer, actions } = authSlice;

export const { setToken, setUser, setLoggedIn } = actions;
export default reducer;
