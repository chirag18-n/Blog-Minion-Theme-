import { configureStore } from "@reduxjs/toolkit";
import blog from "./blogs/blogSlice";
import auth from "./auth/authSlice";

const store = configureStore({
  reducer: { blog, auth },
});

export default store;
