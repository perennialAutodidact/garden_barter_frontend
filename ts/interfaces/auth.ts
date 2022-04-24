import { FormEventHandler } from "react";

export interface User {
  username: string;
}

export interface AuthFormProps {
  formMode: string;
  formTitle: string;
}

export interface AuthFormData {
  email: string;
  password: string;
  password2?: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    authLoadingStatus: "PENDING" | "IDLE";
    accessToken: string | null;
  };
  
