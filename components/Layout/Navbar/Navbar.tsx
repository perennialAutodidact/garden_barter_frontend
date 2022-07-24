import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import AuthLinks from "./AuthLinks";
import GuestLinks from "./GuestLinks";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { logout } from "../../../store/authSlice/actions";
import { unwrapResult } from "@reduxjs/toolkit";
import { CgAdd } from "react-icons/cg";
import Link from "next/link";

function GBNavbar() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, authLoadingStatus, user } = useAppSelector(
    state => state.auth
  );

  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(logout())
      .then(unwrapResult)
      .then(res => {
        router.push("/");
      })
      .catch(err => console.log(err));
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
      <div className="container-fluid ps-lg-3 pe-lg-5">
        {/* LOGO */}
        <Link href="/">
          <a className="navbar-brand d-flex align-items-center gap-3">
            <img
              src="/images/garden_barter_logo.svg"
              className="navbar-logo px-lg-3"
              alt="Garden Barter Logo"
            />
            <h1 className="navbar-brand-heading text-success m-0">
              Garden Barter
            </h1>
          </a>
        </Link>
        {authLoadingStatus === "PENDING"
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
          className="collapse navbar-collapse d-lg-flex justify-content-lg-end align-items-lg-center"
          id="navbarNav"
        >
          {authLoadingStatus === "PENDING"
            ? <div
                className="navbar-nav spinner-border text-success"
                role="status"
              >
                {""}
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
