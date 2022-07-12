import React, { useEffect, useState } from "react";
import Head from "next/head";
import GBNavbar from "./Navbar/Navbar";
import AlertList from "../AlertList";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { verify, refresh, fetchUser } from "../../store/authSlice/actions";
import { useRouter } from "next/router";

function Layout({ children }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  // load bootstrap and initialize tool tips
  useEffect(() => {
    (async () => {
      let bootstrap = await import("bootstrap/dist/js/bootstrap.bundle");

      var tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      );
      var tooltipList = tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
      });
    })();
  }, []);

  useEffect(
    () => {
      if (dispatch && dispatch != null && dispatch !== undefined) {
        // check the validity of the access token
        dispatch(verify("access"))
          .then(unwrapResult)
          .then(res => {
            dispatch(fetchUser());
          })
          // if the access token is expired or invalid, verify the refresh token
          .catch(err => {
            // if refresh token is still valid, request a new access token
            dispatch(refresh())
              .then(unwrapResult)
              .then(res => {
                dispatch(fetchUser());
              })
              // if refresh token is also invalid...
              .catch(err => {
                console.log('Something went wrong refreshing tokens in layout component')
              });
          });
      }
    },
    [dispatch]
  );

  return (
    <div className="bg-primary" id="app-container">
      <Head>
        <title>Garden Barter</title>
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

