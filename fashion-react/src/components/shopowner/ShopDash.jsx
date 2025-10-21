import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ShopDash = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3002/shop", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (res.ok && Array.isArray(data)) {
          setShops(data);
        } else {
          setError(data.message || "No shops found or unauthorized access.");
        }
      } catch (err) {
        console.error("Error fetching shops:", err);
        setError("Failed to load shop data.");
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this shop?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:3002/shop/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setShops((prev) => prev.filter((shop) => shop._id !== id));
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete shop.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Something went wrong while deleting the shop.");
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold text-primary">My Shops</h3>
        <button
          className="btn btn-success px-4"
          onClick={() => navigate("/create-shop")}
        >
          + Add New Shop
        </button>
      </div>

      {shops.length === 0 ? (
        <p className="text-muted text-center">You haven’t created any shops yet.</p>
      ) : (
        <div className="row">
          {shops.map((shop) => (
            <div className="col-md-6 col-lg-4 mb-4" key={shop._id}>
              <div className="card shadow-sm border-0 rounded-4 h-100">
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="fw-bold text-success mb-1">{shop.name}</h5>
                    <p className="text-muted mb-2">
                      <i className="bi bi-geo-alt-fill text-danger"></i>{" "}
                      {shop.location}
                    </p>
                    <p className="small text-secondary">{shop.description}</p>
                    <p className="small">
                      <strong>Owner:</strong> {shop.owner?.name} (
                      {shop.owner?.email})
                    </p>
                    <p className="small">
                      <strong>Rating:</strong> ⭐ {shop.rating || 0}
                    </p>
                  </div>

                  <div className="d-flex justify-content-between mt-3">
                    <Link
                      to={`/shopowner/shop/${shop._id}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      View
                    </Link>
                    <Link
                      to={`/shopowner/edit/${shop._id}`}
                      className="btn btn-outline-success btn-sm"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(shop._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShopDash;
