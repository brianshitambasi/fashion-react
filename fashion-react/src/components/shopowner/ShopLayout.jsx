import React from "react";
import { Link, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ShopLayout = () => {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3"
        style={{ width: "260px", minHeight: "100vh" }}
      >
        <h3 className="text-center mb-4 fw-bold text-uppercase">Shop Panel</h3>

        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="/shopowner" className="nav-link text-white">
              <i className="bi bi-speedometer2 me-2"></i> Dashboard
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/shopowner/create" className="nav-link text-white">
              <i className="bi bi-shop me-2"></i> Create Shop
            </Link>
          </li>
          <li className="nav-item mb-2">
            <a href="#" className="nav-link text-white disabled">
              <i className="bi bi-gear me-2"></i> Settings
            </a>
          </li>
        </ul>

        <div className="mt-auto text-center">
          <hr className="border-light" />
          <button
            className="btn btn-outline-light btn-sm w-100"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 bg-light">
        {/* Top Navbar */}
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
          <div className="container-fluid">
            <h4 className="fw-bold text-primary mb-0">Looks Nairobi Shop Dashboard</h4>
          </div>
        </nav>

        {/* Outlet for nested pages */}
        <div className="p-4">
          <Outlet /> {/* 👈 This is where ShopDash, CreateShop, etc. will render */}
        </div>
      </div>
    </div>
  );
};

export default ShopLayout;
