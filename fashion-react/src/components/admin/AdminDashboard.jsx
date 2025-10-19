import React from "react";

const AdminDashboard = () => {
  const stats = [
    { title: "Users", count: 1200, icon: "bi-people", color: "primary" },
    { title: "Shops", count: 85, icon: "bi-shop", color: "success" },
    { title: "Hairstyles", count: 340, icon: "bi-scissors", color: "warning" },
    { title: "Bookings", count: 210, icon: "bi-calendar-check", color: "info" },
    { title: "Payments", count: 540, icon: "bi-credit-card", color: "danger" },
    { title: "Reviews", count: 120, icon: "bi-star", color: "secondary" },
  ];

  return (
    <div className="container-fluid">
      <h3 className="mb-4 fw-bold text-success">Dashboard Overview</h3>

      <div className="row g-4">
        {stats.map((s, idx) => (
          <div className="col-md-4" key={idx}>
            <div className={`card shadow-sm border-0 text-bg-${s.color}`}>
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="card-title">{s.title}</h5>
                  <h2 className="fw-bold">{s.count}</h2>
                </div>
                <i className={`bi ${s.icon} fs-1 opacity-75`}></i>
              </div>
            </div>
          </div>
        ))}
      </div>

      <hr className="my-4" />

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h5 className="fw-bold text-success">Recent Activity</h5>
          <p className="text-muted">No recent activity yet.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
