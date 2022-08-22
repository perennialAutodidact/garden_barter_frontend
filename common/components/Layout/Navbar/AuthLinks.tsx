import React from 'react'
import Link from 'next/link'
import { AuthLinksProps } from '../../../../ts/interfaces/auth';
import { useAppDispatch } from '../../../../store/hooks';
import {CgAdd} from 'react-icons/cg'

function AuthLinks ({ handleLogout }: AuthLinksProps) {
  return (
    <ul className='navbar-nav ps-lg-0 text-end'>

          {/* New Barter Button */}
          <div
            className="text-end d-flex align-items-center justify-content-end"
            data-bs-toggle="tooltip"
                    data-bs-placement="left"
                    title="New Barter"
          >
            <Link href="/barters/create/">
                <a 
                    className='text-decoration-none'
                    
                >
                    <CgAdd className="h1 m-0 text-success" />
                </a>
            </Link>
          </div>



      <li className='nav-item active'>
        <a className='nav-link fw-bold' href='#'>
          About
        </a>
      </li>


      <li className='nav-item dropdown'>
        <a
          className='nav-link dropdown-toggle fw-bold'
          href='#'
          id='navbarDropdownMenuLink'
          data-bs-toggle='dropdown'
          aria-haspopup='true'
          aria-expanded='false'
        >
          Account
        </a>
        <div
          className='dropdown-menu bg-light-dark dropdown-menu-lg-end shadow'
          aria-labelledby='navbarDropdownMenuLink'
        >
          <a className='dropdown-item text-end ' href='#'>
            My Account
            <i
              className='
                    bi bi-house-heart-fill text-primary 
                    ps-3 
                    '
            ></i>
          </a>
          <Link href='/barters/create/'>
            <a className='dropdown-item text-end'>
              Create Post
              <i
                className='
                    bi bi-pencil-fill text-primary 
                    ps-3 
                    '
              ></i>
            </a>
          </Link>
          <a className='dropdown-item text-end' href='#' onClick={handleLogout}>
            {/* <i className="bi bi-door-closed-fill text-primary pe-3 d-lg-none"></i> */}
            Log Out
            <i
              className='
                    bi bi-door-closed-fill text-primary 
                    ps-3
                    '
            ></i>
          </a>
        </div>
      </li>
    </ul>
  )
}

export default AuthLinks
