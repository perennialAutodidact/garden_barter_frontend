import React from "react";
import Head from "next/head";

import GBNavbar from "./Navbar/Navbar";

function Layout({ children }) {
  return (
    <div className='bg-primary'>
      <Head>
        <title>Garden Barter</title>
        <meta name="description" content="Building community, one trade at a time." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <GBNavbar/>
      <div className="container-fluid" id="app-container">
        {children}
      </div>
    </div>
  );
}

export default Layout;
