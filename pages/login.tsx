import React from "react";
import { AuthForm } from "../components/Auth/AuthForm"; 

function Login({}) {
  return (
    <div className="container-fluid">
      <AuthForm formMode="log in" formTitle="Log In" />
    </div>
  );
}

export default Login;
