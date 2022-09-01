import React, { useEffect, useState } from "react";
import Head from "next/head";
import GBNavbar from "./Navbar/Navbar";
import AlertList from "../../../components/AlertList";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { updateTokens, fetchUser } from "../../../store/authSlice/actions";
import { useRouter } from "next/router";

function Layout({ children, title, }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
    const {isAuthenticated, user, authLoadingStatus } = useAppSelector(state=>state.auth)
    
  useEffect(() => {
    if (dispatch && dispatch != null && dispatch !== undefined) {
        if(!user && !isAuthenticated && authLoadingStatus === 'IDLE'){
            dispatch(fetchUser());
        }
    }
  }, [dispatch]);

  return (
    <div className="bg-primary" id="app-container">
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8"></meta>
        <meta
          name="description"
          content="Building community, one trade at a time."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GBNavbar />
      <AlertList />
      {children}
    </div>
  );
}

export default Layout;
