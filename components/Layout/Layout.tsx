import React from "react";
import Head from "next/head";
import { useAppSelector } from "../../store/hooks";

import GBNavbar from "./Navbar/Navbar";
import MessageList from "../MessageList";

function Layout({ children }) {
    const { messages } = useAppSelector(state=>state.messages);
  return (
    <div className='bg-primary'>
      <Head>
        <title>Garden Barter</title>
        <meta name="description" content="Building community, one trade at a time." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <GBNavbar/>
        <MessageList />
      <div className="container-fluid" id="app-container">
        {children}
      </div>
    </div>
  );
}

export default Layout;
