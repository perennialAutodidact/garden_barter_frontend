import React from 'react'
function AuthLinks () {
  return (
    <ul className='navbar-nav ps-lg-0 text-end'>
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
          <a className='dropdown-item text-end' href='#'>
            Create Post
            <i
              className='
                    bi bi-pencil-fill text-primary 
                    ps-3 
                    '
            ></i>
          </a>
          <a className='dropdown-item text-end' href='#'>
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
