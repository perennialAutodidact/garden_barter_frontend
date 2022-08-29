import React from "react";
import { AuthForm } from "../components/Auth/AuthForm";
import Layout from '../common/components/Layout'
const Login: React.FC = ({ }) => {

    return (
        <Layout title={'Log In'}>
            <div className="container-fluid">
                <AuthForm formMode="log in" formTitle="Log In" />
            </div>
        </Layout>
    );
}

export default Login;
