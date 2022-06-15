import React, { useEffect, useState } from "react";
import Head from "next/head";
import GBNavbar from "./Navbar/Navbar";
import AlertList from "../AlertList";
import { unwrapResult } from "@reduxjs/toolkit";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { requestToken } from "../../store/authSlice/actions";

function Layout({ children }) {
  const dispatch = useAppDispatch();
  const { accessToken, authLoadingStatus } = useAppSelector(
    state => state.auth
  );

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
      if (!accessToken && authLoadingStatus === "PENDING") {
        dispatch(requestToken())
          .then(unwrapResult)
          .then(res => console.log(res))
          .catch(err => {
            console.log(err);
          });
      }
    },
    [accessToken, authLoadingStatus]
  );

  const { alerts } = useAppSelector(state => state.alerts);
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

export const getServerSideProps = async () => {};
