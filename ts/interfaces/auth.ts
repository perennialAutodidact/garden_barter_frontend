import { FormEventHandler } from "react";

export interface User {
  username: string;
}

export interface AuthFormProps {
  formMode: string;
  formTitle: string;
}

export interface AuthFormData {
  username: string;
  password1: string;
  password2?: string;
}
