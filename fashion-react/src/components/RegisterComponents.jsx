import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const RegisterComponent = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "customer",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await axios.post("https://fashion2-sx2l.onrender.com/register", form);
      if (res.data.success) {
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(res.data.message || "Registration failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="card shadow-lg border-0 rounded-4 p-4" style={{ maxWidth: "450px", width: "100%" }}>
        <div className="text-center mb-4">
          <h1 className="text-success fw-bold">LOOKS NAIROBI</h1>
          <p className="text-muted">Join the ultimate beauty & grooming experience</p>
        </div>

        {error && <div className="alert alert-danger py-2">{error}</div>}
        {success && <div className="alert alert-success py-2">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="form-control form-control-lg"
              placeholder="John Doe"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="form-control form-control-lg"
              placeholder="example@email.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="form-control form-control-lg"
              placeholder="+254..."
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="form-control form-control-lg"
              placeholder="••••••••"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Select Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="form-select form-select-lg"
              required
            >
              <option value="customer">Customer</option>
              <option value="shop">Shop Owner</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="d-grid mb-3">
            <button type="submit" disabled={loading} className="btn btn-success btn-lg">
              {loading ? "Creating Account..." : "Register"}
            </button>
          </div>

          <div className="text-center">
            <p className="text-muted">
              Already have an account?{" "}
              <Link to="/login" className="text-success fw-semibold text-decoration-none">
                Login
              </Link>
            </p>
          </div>
        </form>

        <hr />
        <div className="text-center text-muted small">
          © {new Date().getFullYear()} Looks Nairobi — Beauty Redefined ✂️
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
