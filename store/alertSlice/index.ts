import { createSlice, PayloadAction, createAction } from "@reduxjs/toolkit";
import {
  AlertState,
  Alert,
//   AlertPayload
} from "../../ts/interfaces/alerts";

const TEST_ALERTS = [
  {
    id: 1,
    text: "This is a success message",
    level: "success"
  },
  {
    id: 2,
    text: "This is a info message",
    level: "info"
  },
  {
    id: 3,
    text: "This is a warning message",
    level: "warning"
  },
  {
    id: 4,
    text: "This is a warning message",
    level: "danger"
  }
];

export const initialState: AlertState = {
    alerts: [] as Alert[]
};

const alertSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    createAlert: (state:AlertState, action:PayloadAction<Alert>) => {
        state.alerts = state.alerts.concat(action.payload)
    },
    deleteAlert: (state, action: PayloadAction<Alert>) => {
      state.alerts = state.alerts.filter(
        (alert) => alert.id !== action.payload.id
      );
    }
  }
});

export const { createAlert, deleteAlert } = alertSlice.actions;

export default alertSlice.reducer;
