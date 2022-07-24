import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import authReducer, {
  initialState as initialAuthState
} from "../store/authSlice";
import alertReducer, { initialState as initialAlertState } from "./alertSlice";
import barterReducer, {
  initialState as initialBarterState
} from "../store/bartersSlice";
import inboxReducer, { initialState as initialInboxState } from "./inboxSlice";

export const initialState = {
  auth: initialAuthState,
  alerts: initialAlertState,
  barters: initialBarterState,
  inbox: initialInboxState
};

export const reducer = {
  auth: authReducer,
  alerts: alertReducer,
  barters: barterReducer,
  inbox: inboxReducer
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
