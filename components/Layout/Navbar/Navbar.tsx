import React from "react";
import Image from "next/image";
import AuthLinks from "./AuthLinks";
import GuestLinks from "./GuestLinks";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { logout } from "../../../store/authSlice/actions";
import { unwrapResult } from "@reduxjs/toolkit";

function GBNavbar() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, authLoadingStatus, user } = useAppSelector(
    state => state.auth
  );

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(logout(user))
      .then(unwrapResult)
      .then(res => {
        console.log("res", res);
      })
      .catch(err => console.log(err));
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
      <div className="container-fluid ps-lg-3 pe-lg-5">
        {/* LOGO */}
        <a className="navbar-brand d-flex align-items-center gap-3" href="#">
          <img
            src="/images/garden_barter_logo.svg"
            className="navbar-logo px-lg-3"
            alt="Garden Barter Logo"
          />
          <h1 className="navbar-brand-heading text-success m-0">
            Garden Barter
          </h1>
        </a>
        {(!isAuthenticated && authLoadingStatus) === "PENDING"
          ? <div
              className="navbar-nav spinner-border text-success d-lg-none"
              role="status"
            >
              <span className="visually-hidden">Loading...</span>
            </div>
          : // HAMBURGER
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>}

        {/* NAV LINKS */}
        <div
          className="collapse navbar-collapse d-lg-flex justify-content-lg-end align-items-lg-end"
          id="navbarNav"
        >
          {(!isAuthenticated && authLoadingStatus) === "PENDING"
            ? <div
                className="navbar-nav spinner-border text-success"
                role="status"
              >
               {''}
              </div>
            : isAuthenticated
              ? <AuthLinks handleLogout={handleLogout} />
              : <GuestLinks />}
        </div>
      </div>
    </nav>
  );
}

export default GBNavbar;
