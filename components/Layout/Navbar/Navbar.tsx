import React from "react";
import Image from "next/image";
import AuthLinks from "./AuthLinks";
import GuestLinks from "./GuestLinks";
function GBNavbar() {
  return (
    
<nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
    <div className="container-fluid ps-lg-3 pe-lg-5">

        {/* LOGO */}
        <a className="navbar-brand d-flex align-items-center gap-3" href="#">
            <img src='/images/garden_barter_logo.svg' className="navbar-logo px-lg-3" alt="Garden Barter Logo"/>
            <h1 className="navbar-brand-heading text-success m-0">Garden Barter</h1>
        </a>

        {/* HAMBURGER */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAV LINKS */}
        <div className="collapse navbar-collapse d-lg-flex justify-content-lg-end align-items-lg-end" id="navbarNav">
            {/* <AuthLinks/> */}
            <GuestLinks />
        </div>
        
    </div>
</nav>
  );
}

export default GBNavbar;
