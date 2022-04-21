import React from "react";
import { AuthForm } from "../components/Auth/AuthForm";

function Signup({}) {
  

  return (
    <div className="container-fluid">
      <AuthForm
        formMode="sign up"
        formTitle="Sign Up"
      />
    </div>
  );
}

export default Signup;
