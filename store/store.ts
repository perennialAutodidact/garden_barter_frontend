import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import authReducer, {
  initialState as initialAuthState
} from "../store/authSlice";
import messageReducer, {
  initialState as initialMessageState
} from "../store/messageSlice";
import barterReducer, {
  initialState as initialBarterState
} from "../store/bartersSlice";

export const initialState = {
  auth: initialAuthState,
  messages: initialMessageState,
  barters: initialBarterState
};

export const reducer = {
  auth: authReducer,
  messages: messageReducer,
  barters: barterReducer
};

export const store = configureStore({
  reducer: reducer
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
