import React from "react";
import { AuthForm } from "../components/Auth/AuthForm"; 

const Login:React.FC = ({}) => {

  return (
    <div className="container-fluid">
      <AuthForm formMode="log in" formTitle="Log In" />
    </div>
  );
}

export default Login;
