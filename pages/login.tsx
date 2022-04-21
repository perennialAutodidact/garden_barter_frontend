import React from "react";
import { AuthForm } from "../components/Auth/AuthForm"; 
import {useAppSelector, useAppDispatch} from '../store/hooks'
import {login} from '../store/authSlice'

const Login:React.FC = ({}) => {

    const dispatch = useAppDispatch();

  return (
    <div className="container-fluid">
      <AuthForm formMode="log in" formTitle="Log In" />
    </div>
  );
}

export default Login;
