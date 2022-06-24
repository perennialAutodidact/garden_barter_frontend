import "../styles/globals.scss";
import Layout from "../components/Layout/Layout";
import { useEffect } from "react";
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { store } from '../store/store';
import axios from "axios";

axios.defaults.withCredentials = true

function MyApp({ Component, pageProps }:AppProps) {

    return (
        <Provider store={store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}

export default MyApp;
