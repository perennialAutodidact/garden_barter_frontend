import { PayloadAction } from "@reduxjs/toolkit";
import React from "react";
import type { AppDispatch } from "../../store/store";
export interface Alert {
  id: Number;
  text: string;
  level: string;
}

export interface AlertItemProps {
  alert: Alert;
  alertIndex: number;
  dispatch: AppDispatch;
}

export interface AlertState {
  alerts: Alert[];
}
