import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const SideBar = () => {
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3 d-flex flex-column"
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
            <Link to="/shopowner/shops" className="nav-link text-white">
              <i className="bi bi-grid me-2"></i> My Shops
            </Link>
          </li>

          {/* ✅ Clickable Settings */}
          <li className="nav-item mb-2">
            <button
              type="button"
              className="btn text-white text-start w-100"
              style={{ background: "none", border: "none" }}
              onClick={() => setShowSettings(true)}
            >
              <i className="bi bi-gear me-2"></i> Settings
            </button>
          </li>
        </ul>

        <div className="mt-auto text-center">
          <hr className="border-light" />
          <button className="btn btn-outline-light w-100" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right me-2"></i> Logout
          </button>
        </div>
      </div>

      {/* ⚙️ Custom Modal Overlay */}
      {showSettings && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            zIndex: 1050,
          }}
          onClick={() => setShowSettings(false)}
        >
          <div
            className="bg-white rounded-4 shadow-lg p-4"
            style={{
              width: "90%",
              maxWidth: "400px",
              animation: "fadeIn 0.3s ease-in-out",
            }}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold mb-0">
                <i className="bi bi-gear me-2 text-primary"></i>Settings
              </h5>
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setShowSettings(false)}
              >
                ✕
              </button>
            </div>

            <form>
              <div className="mb-3">
                <label className="form-label fw-semibold">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Mary Styles"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="mary@looksnairobi.com"
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Change Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="********"
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;
