import React from "react";
import { AuthForm } from "../components/Auth/AuthForm";
import Layout from '../common/components/Layout'
function Signup({ }) {

    return (
        <Layout title={"Sign Up"}>

            <div className="container-fluid">
                <AuthForm
                    formMode="sign up"
                    formTitle="Sign Up"
                />
            </div>
        </Layout>
    );
}

export default Signup;
