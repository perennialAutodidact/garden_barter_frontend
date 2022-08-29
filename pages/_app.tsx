import "../styles/globals.scss";
import { useEffect } from "react";
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { store } from '../store/store';


function MyApp({ Component, pageProps }: AppProps) {

    useEffect(()=>{
        (()=>{require('bootstrap/dist/js/bootstrap.bundle')})()
    }, [])
    return (
        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    );
}


export default MyApp;
