import React from "react";
import Image from "next/image";
import AuthLinks from "./AuthLinks";
import GuestLinks from "./GuestLinks";
function GBNavbar() {
  return (
    
<nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
    <div className="container-fluid ps-3 pe-5">

        {/* LOGO */}
        <a className="navbar-brand d-flex align-items-center" href="#">
            <img src='/images/garden_barter_logo.svg' className="navbar-logo px-3" alt="Garden Barter Logo"/>
            <h1 className="navbar-brand-heading text-success m-0">Garden Barter</h1>
        </a>

        {/* HAMBURGER */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>

        {/* NAV LINKS */}
        <div className="collapse navbar-collapse d-lg-flex justify-content-end align-items-end" id="navbarNav">
            {/* <AuthLinks/> */}
            <GuestLinks />
        </div>
        
    </div>
</nav>
  );
}

export default GBNavbar;
