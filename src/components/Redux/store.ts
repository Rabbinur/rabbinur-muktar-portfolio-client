import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./Slice/sidebarSlice";
import authReducer from "./Slice/authSlice";
import { nodeApi } from "./nodeApi";
import { laravelApi } from "./laravelApi";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sidebar: sidebarReducer,
    [nodeApi.reducerPath]: nodeApi.reducer,
    [laravelApi.reducerPath]: laravelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(nodeApi.middleware)
      .concat(laravelApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
