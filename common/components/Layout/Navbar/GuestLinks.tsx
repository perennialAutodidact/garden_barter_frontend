import React from "react";
import Link from "next/link";
function GuestLinks() {
  return (
    <ul className="navbar-nav ps-lg-0 text-end">
      <li className="nav-item active">
        <Link href="/signup">
          <a className="nav-link fw-bold">Sign Up</a>
        </Link>
      </li>
      <li className="nav-item active">
        <Link href="/login">
          <a className="nav-link fw-bold">
            Log In
          </a>
        </Link>
      </li>
    </ul>
  );
}

export default GuestLinks;
