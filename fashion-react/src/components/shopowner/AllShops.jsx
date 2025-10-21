// src/components/shop/AllShops.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AllShops = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const res = await axios.get("http://localhost:3002/shop/getAll");
        setShops(res.data);
      } catch (error) {
        console.error("Error fetching shops:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchShops();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading shops...</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-success mb-4 fw-bold text-center">All Shops</h2>

      <div className="row">
        {shops.length > 0 ? (
          shops.map((shop) => (
            <div key={shop._id} className="col-md-4 mb-4">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <h5 className="card-title text-success">{shop.name}</h5>
                  <p className="text-muted mb-1">
                    <i className="bi bi-geo-alt"></i> {shop.location}
                  </p>
                  <p>{shop.description}</p>

                  <h6 className="fw-semibold">Services:</h6>
                  <ul className="list-unstyled mb-3">
                    {shop.services.slice(0, 3).map((service) => (
                      <li key={service._id}>
                        💇 {service.serviceName} – Ksh {service.price}
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => navigate(`/shop/${shop._id}`)}
                    className="btn btn-success w-100"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No shops available.</p>
        )}
      </div>
    </div>
  );
};

export default AllShops;
