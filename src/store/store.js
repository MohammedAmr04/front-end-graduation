import { configureStore } from "@reduxjs/toolkit";
import auth from "./Auth/authSlice";
export const store = configureStore({
  reducer: {
    auth,
  },
});
