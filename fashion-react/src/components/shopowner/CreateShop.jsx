import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateShop = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    services: [{ serviceName: "", price: "" }],
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle service change
  const handleServiceChange = (index, e) => {
    const updatedServices = [...formData.services];
    updatedServices[index][e.target.name] = e.target.value;
    setFormData({ ...formData, services: updatedServices });
  };

  // Add a new service row
  const addService = () => {
    setFormData({
      ...formData,
      services: [...formData.services, { serviceName: "", price: "" }],
    });
  };

  // Remove a service row
  const removeService = (index) => {
    const updatedServices = formData.services.filter((_, i) => i !== index);
    setFormData({ ...formData, services: updatedServices });
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token"); // assumes you saved token after login
      const res = await fetch("http://localhost:3002/shop", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Shop created successfully!");
        console.log("Shop created:", data);
        setFormData({
          name: "",
          location: "",
          description: "",
          services: [{ serviceName: "", price: "" }],
        });
      } else {
        setMessage(`❌ ${data.message || "Failed to create shop"}`);
      }
    } catch (error) {
      console.error("Error creating shop:", error);
      setMessage("❌ Server error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5 col-md-8">
      <div className="card shadow-lg border-0 rounded-4">
        <div className="card-body p-4">
          <h3 className="mb-4 text-center text-primary">Create a New Shop</h3>

          {message && (
            <div
              className={`alert ${
                message.includes("✅") ? "alert-success" : "alert-danger"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-bold">Shop Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Location</label>
              <input
                type="text"
                name="location"
                className="form-control"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Description</label>
              <textarea
                name="description"
                className="form-control"
                rows="3"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <h5 className="fw-bold">Services</h5>
            {formData.services.map((service, index) => (
              <div key={index} className="row g-2 mb-2">
                <div className="col-md-6">
                  <input
                    type="text"
                    name="serviceName"
                    className="form-control"
                    placeholder="Service Name"
                    value={service.serviceName}
                    onChange={(e) => handleServiceChange(index, e)}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    placeholder="Price (KES)"
                    value={service.price}
                    onChange={(e) => handleServiceChange(index, e)}
                    required
                  />
                </div>
                <div className="col-md-2 text-center">
                  {index > 0 && (
                    <button
                      type="button"
                      className="btn btn-danger w-100"
                      onClick={() => removeService(index)}
                    >
                      ✖
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div className="text-end mb-3">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={addService}
              >
                ➕ Add Service
              </button>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary px-5"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Shop"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateShop;
