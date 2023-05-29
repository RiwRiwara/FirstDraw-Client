import React from "react";
import { useNavigate } from 'react-router-dom';
import logo from "./logo.svg";
import "./navbar.css";
import { useLogout } from '../../../hooks/useLogout'
import { useAuthContext } from "../../../hooks/useAuthContext";


function Navbar() {
  const navigate = useNavigate();
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const isAdmin = user && user.data && user.data.isAdmin;

  const clickLogout = () => {
    logout();
    handleNavigation("/login")
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid shadow-sm ">
          <a className="navbar-brand " onClick={() => handleNavigation("/")}>
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
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Home
                </a>
                <ul className="dropdown-menu " aria-labelledby="navbarDropdown">
                  <li>
                    <a className="dropdown-item" onClick={() => handleNavigation("/")} >
                      Search
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item " onClick={() => handleNavigation("/blogs")}>
                      Blog
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item " onClick={() => handleNavigation("/news")}>
                      News
                    </a>
                  </li>

                </ul>
              </li>

              <li className="nav-item dropdown ">
                {isAdmin && (
                  <a
                    className="nav-link dropdown-toggle text-primary"
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
                    <a className="dropdown-item " onClick={() => handleNavigation("/admin/request")} style={{cursor:"pointer"}}>
                      User Request
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item " onClick={() => handleNavigation("/admin/card")} style={{cursor:"pointer"}}>  
                      Card Manager
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item " onClick={() => handleNavigation("/admin/deck")} style={{cursor:"pointer"}}>
                      Deck Manager
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item " onClick={() => handleNavigation("/admin/user")} style={{cursor:"pointer"}}>
                      User Manager
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item " onClick={() => handleNavigation("/news")} style={{cursor:"pointer"}}>
                      News
                    </a>
                  </li>
                </ul>
              </li>
              {user && (
                <li className="nav-item ">
                  <a className="nav-link text-primary"
                    onClick={() => handleNavigation("/profile")}
                    style={{ cursor: "pointer" }}
                  >
                    Profile
                  </a>
                </li>
              )}
              {user && (
                <li className="nav-item">
                  <a className="nav-link text-primary"
                    onClick={() => handleNavigation("/collections")}
                    style={{ cursor: "pointer" }}
                  >
                    My Collections
                  </a>
                </li>
              )}
              {user && (
                <li className="nav-item">
                  <a className="nav-link text-primary"
                    onClick={() => handleNavigation("/")}
                    style={{ cursor: "pointer" }}
                  >
                    Request
                  </a>
                </li>
              )}
            </ul>

            <ul className="navbar-nav ">

              <li className="nav-item">
                {user ? (
                  <a onClick={clickLogout} className="nav-link text-primary btn btn-link">
                    <i className="bi bi-box-arrow-right"></i> Logout
                  </a>
                ) : (
                  <a className="nav-link text-primary"
                  onClick={() => handleNavigation("/login")}
                  style={{ cursor: "pointer" }}
                  >
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

export default Navbar;
