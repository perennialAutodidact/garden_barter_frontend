import { FormEventHandler, ReactDOM } from "react";

export interface User {
  id: number;
  email: string;
  username: string;
  lastLogin: Date | string;
  firstName: string;
  lastName: string;
  isStaff: boolean;
  dateJoined: Date | string;
  isActive?: boolean;
  isSuperuser?: boolean;
}

export interface AuthFormProps {
  formMode: string;
  formTitle: string;
}

export interface AuthLinksProps {
    handleLogout: React.MouseEventHandler
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
}
