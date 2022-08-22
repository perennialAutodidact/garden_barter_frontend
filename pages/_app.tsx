import "../styles/globals.scss";
import Layout from "../common/components/Layout";
import { useEffect } from "react";
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { store } from '../store/store';
import axios from '../common/utils/axiosSetup'

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
