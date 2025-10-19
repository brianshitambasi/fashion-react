import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        className="bg-success text-white p-3"
        style={{ width: "250px", minHeight: "100vh" }}
      >
        <h4 className="text-center mb-4">Looks Nairobi</h4>

        <ul className="nav flex-column">
          <li className="nav-item mb-2">
            <Link to="/admin/dashboard" className="nav-link text-white">
              <i className="bi bi-speedometer2 me-2"></i> Dashboard
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/admin/users" className="nav-link text-white">
              <i className="bi bi-people me-2"></i> Users
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/admin/shops" className="nav-link text-white">
              <i className="bi bi-shop me-2"></i> Shops
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/admin/hairstyles" className="nav-link text-white">
              <i className="bi bi-scissors me-2"></i> Hairstyles
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/admin/bookings" className="nav-link text-white">
              <i className="bi bi-calendar-check me-2"></i> Bookings
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/admin/payments" className="nav-link text-white">
              <i className="bi bi-credit-card me-2"></i> Payments
            </Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/admin/reviews" className="nav-link text-white">
              <i className="bi bi-star me-2"></i> Reviews
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow-1 bg-light">
        <nav className="navbar navbar-light bg-white shadow-sm px-4">
          <div className="d-flex justify-content-between w-100">
            <h5 className="m-0 fw-semibold text-success">Admin Panel</h5>
            <button className="btn btn-outline-danger btn-sm">
              <i className="bi bi-box-arrow-right me-1"></i> Logout
            </button>
          </div>
        </nav>

        <div className="container-fluid p-4">
          <Outlet /> {/* Content from nested routes */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
