import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import authReducer from "../store/authSlice";
import messageReducer from "../store/messageSlice";

export const store = configureStore({
  reducer: {
        auth: authReducer,
    messages: messageReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
