import React, { useEffect } from "react";
import Head from "next/head";

import GBNavbar from "./Navbar/Navbar";
import MessageList from "../MessageList";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { requestToken } from "../../store/authSlice/actions";

function Layout({ children }) {
  const dispatch = useAppDispatch();
  const { accessToken, authLoadingStatus } = useAppSelector(
    state => state.auth
  );
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle");
  }, []);

  useEffect(
    () => {
      if (!accessToken && authLoadingStatus === "PENDING") {
        dispatch(requestToken())
            .then(unwrapResult)
            .then(res=>console.log(res))
            .catch(err=>console.log(err));
      }
    },
    [accessToken, authLoadingStatus]
  );

  const { messages } = useAppSelector(state => state.messages);
  return (
    <div className="bg-primary">
      <Head>
        <title>Garden Barter</title>
        <meta
          name="description"
          content="Building community, one trade at a time."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GBNavbar />
      <MessageList />
      <div className="container-fluid" id="app-container">
        {children}
      </div>
    </div>
  );
}

export default Layout;
