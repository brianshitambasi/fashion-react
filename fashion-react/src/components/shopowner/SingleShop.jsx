// src/components/shop/SingleShop.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const SingleShop = () => {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/shop/get/${id}`);
        setShop(res.data);
      } catch (error) {
        console.error("Error fetching shop:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchShop();
  }, [id]);

  if (loading) return <p className="text-center mt-5">Loading shop details...</p>;
  if (!shop) return <p className="text-center mt-5 text-danger">Shop not found.</p>;

  return (
    <div className="container mt-5">
      <Link to="/shops" className="btn btn-outline-success mb-4">
        ← Back to All Shops
      </Link>

      <div className="card shadow border-0 p-4">
        <h2 className="text-success mb-3">{shop.name}</h2>
        <p className="text-muted">
          <i className="bi bi-geo-alt"></i> {shop.location}
        </p>
        <p>{shop.description}</p>

        <h5 className="fw-bold mt-4">Services Offered:</h5>
        <ul className="list-group">
          {shop.services.map((service) => (
            <li key={service._id} className="list-group-item d-flex justify-content-between">
              <span>{service.serviceName}</span>
              <span className="fw-semibold text-success">Ksh {service.price}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SingleShop;
