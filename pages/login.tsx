import React from "react";
import { AuthForm } from "../components/Auth/AuthForm"; 
import {useAppSelector, useAppDispatch} from '../store/hooks'

const Login:React.FC = ({}) => {

  return (
    <div className="container-fluid">
      <AuthForm formMode="log in" formTitle="Log In" />
    </div>
  );
}

export default Login;
