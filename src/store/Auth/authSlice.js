import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  firstName: "",
  userName: "",
  lastName: "",
  email: "",
  gender: "",
  id: "",
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.firstName = action.payload.firstName;
      state.id = action.payload.id;
      state.userName = action.payload.userName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.gender = action.payload.gender;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.firstName = "";
      state.id = "";
      state.userName = "";
      state.lastName = "";
      state.email = "";
      state.gender = "";
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
