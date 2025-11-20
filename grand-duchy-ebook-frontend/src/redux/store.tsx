import { configureStore } from "@reduxjs/toolkit";
import { userApiSlice } from "./apis/userApiSlice";
import { bookApiSlice } from "./apis/bookApiSlice";
import { summaryApiSlice } from "./apis/summaryApiSlice";
import { readListApiSlice } from "./apis/readListApiSlice";
import { characterApiSlice } from "./apis/characterApiSlice";
import { quoteApiSlice } from "./apis/quoteApiSlice";
import { timerApiSlice } from "./apis/timerApiSlice";

export const store = configureStore({
  reducer: {
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [bookApiSlice.reducerPath]: bookApiSlice.reducer,
    [summaryApiSlice.reducerPath]: summaryApiSlice.reducer,
    [readListApiSlice.reducerPath]: readListApiSlice.reducer,
    [characterApiSlice.reducerPath]: characterApiSlice.reducer,
    [quoteApiSlice.reducerPath]: quoteApiSlice.reducer,
    [timerApiSlice.reducerPath]: timerApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApiSlice.middleware,
      bookApiSlice.middleware,
      summaryApiSlice.middleware,
      readListApiSlice.middleware,
      characterApiSlice.middleware,
      quoteApiSlice.middleware,
      timerApiSlice.middleware
    ),
});
