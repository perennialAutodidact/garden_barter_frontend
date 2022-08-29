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

  useEffect(() => {
    if (dispatch && dispatch != null && dispatch !== undefined) {
      // check the validity of the access token
      dispatch(updateTokens())
        .then(unwrapResult)
        .then((res) => {
            console.log('fetching user...')
          dispatch(fetchUser());
        })
        // if refresh token is also invalid...
        .catch((err) => {
          console.log(
            "Something went wrong refreshing tokens in layout component"
          );
        });
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
