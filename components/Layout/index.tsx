import React from "react";
import Head from "next/head";

import { Container } from "reactstrap";

function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Garden Barter</title>
        <meta name="description" content="Building community, one trade at a time." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <h1>HELLOWORLD</h1>
      <Container fluid>
        {children}
      </Container>
    </div>
  );
}

export default Layout;
