import React from "react";
import logo from "./logo.svg";
import "./navbar.css";
import { useLogout } from '../../../hooks/useLogout'
import { useAuthContext } from "../../../hooks/useAuthContext";

function Navbar() {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const isAdmin = user && user.data && user.data.isAdmin;

  const clickLogout = () => {
    logout()
  }
  return (
    <div >
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid shadow-sm ">
          <a className="navbar-brand " href="/">
            <img src={logo} className="logo" alt="logo" />
          </a>
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#myNavbar"
            aria-controls="myNavbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon "></span>
          </button>
          <div className="collapse navbar-collapse " id="myNavbar">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown ">
                <a
                  className="nav-link dropdown-toggle text-primary"
                  href="/"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Home
                </a>
                <ul className="dropdown-menu " aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" href="/">
                      Search
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item " href="/blogs">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item " href="/">
                      News
                    </a>
                  </li>

                </ul>
              </li>

              <li className="nav-item dropdown ">
                {isAdmin && (
                  <a
                    className="nav-link dropdown-toggle text-primary"
                    href="/"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Admin Panel
                  </a>
                )}
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item " href="/">
                      User Request
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item " href="/">
                      Card Manager
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item " href="/">
                      Deck Manager
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item " href="/">
                      User Manager
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item " href="/">
                      News
                    </a>
                  </li>
                </ul>
              </li>
              {user && (
                <li className="nav-item ">
                  <a className="nav-link text-primary" href="/profile">
                    Profile
                  </a>
                </li>
              )}
              {user && (
                <li className="nav-item">
                  <a className="nav-link text-primary" href="/">
                    My Collections
                  </a>
                </li>
              )}
              {user && (
                <li className="nav-item">
                  <a className="nav-link text-primary" href="/">
                    Request
                  </a>
                </li>
              )}


            </ul>
            <ul className="navbar-nav ">
              <li className="nav-item">

                {user ? (
                  <a onClick={clickLogout} class="nav-link text-primary btn btn-link"><i class="bi bi-box-arrow-right"></i>Logout</a>
                ) : (
                  <a className="nav-link text-primary" href="/login">
                    <i className="bi bi-box-arrow-in-right "></i> Login
                  </a>
                )}

              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>



  );
}

export default Navbar
