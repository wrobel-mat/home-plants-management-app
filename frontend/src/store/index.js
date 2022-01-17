import { configureStore } from "@reduxjs/toolkit";
import { plantsApi } from "store/api/plantsApi";

export default configureStore({
  reducer: {
    [plantsApi.reducerPath]: plantsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(plantsApi.middleware),
});
