import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const EditShop = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Fetch shop by ID
  useEffect(() => {
    const fetchShop = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:3002/shop/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok) {
          setShop(data);
        } else {
          setError(data.message || "Failed to load shop data.");
        }
      } catch (err) {
        setError("Error fetching shop data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchShop();
  }, [id]);

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShop((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...shop.services];
    updatedServices[index][field] = value;
    setShop((prev) => ({ ...prev, services: updatedServices }));
  };

  const addService = () => {
    setShop((prev) => ({
      ...prev,
      services: [...prev.services, { serviceName: "", price: "" }],
    }));
  };

  const removeService = (index) => {
    const updated = shop.services.filter((_, i) => i !== index);
    setShop((prev) => ({ ...prev, services: updated }));
  };

  // ✅ Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3002/shop/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: shop.name,
          location: shop.location,
          description: shop.description,
          services: shop.services,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Shop updated successfully!");
        setTimeout(() => navigate("/shopowner"), 1500);
      } else {
        setError(data.message || "❌ Failed to update shop");
      }
    } catch (err) {
      setError("Something went wrong while updating.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card shadow border-0 p-4 rounded-4">
        <h3 className="fw-bold text-primary mb-3">Edit Shop</h3>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-bold">Shop Name</label>
            <input
              type="text"
              name="name"
              value={shop.name}
              onChange={handleChange}
              className="form-control rounded-3"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Location</label>
            <input
              type="text"
              name="location"
              value={shop.location}
              onChange={handleChange}
              className="form-control rounded-3"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Description</label>
            <textarea
              name="description"
              value={shop.description}
              onChange={handleChange}
              className="form-control rounded-3"
              rows="3"
            ></textarea>
          </div>

          <h5 className="fw-bold mt-4">Services</h5>
          {shop.services.map((service, index) => (
            <div
              key={index}
              className="d-flex align-items-center gap-3 mb-2 border p-2 rounded-3"
            >
              <input
                type="text"
                placeholder="Service Name"
                value={service.serviceName}
                onChange={(e) =>
                  handleServiceChange(index, "serviceName", e.target.value)
                }
                className="form-control"
                required
              />
              <input
                type="number"
                placeholder="Price (KES)"
                value={service.price}
                onChange={(e) =>
                  handleServiceChange(index, "price", e.target.value)
                }
                className="form-control"
                required
              />
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => removeService(index)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-outline-primary btn-sm mb-3"
            onClick={addService}
          >
            + Add Service
          </button>

          <div className="d-flex justify-content-end gap-3">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditShop;
