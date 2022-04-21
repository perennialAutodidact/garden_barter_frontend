import "../styles/globals.scss";
import Layout from "../components/Layout/Layout";
import { useEffect } from "react";
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { store } from '../store/store';

function MyApp({ Component, pageProps }:AppProps) {
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap.bundle");
    }, []);
    return (
        <Provider store={store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}

export default MyApp;
