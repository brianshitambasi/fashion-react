import React from "react";
import { Link } from "react-router-dom";
import "../Home.css";

const HomeComponent = () => {
  return (
    <div className="home">
      {/* ===== Hero Section ===== */}
      <section className="hero d-flex align-items-center justify-content-center text-center text-white bg-dark position-relative">
        <div className="overlay position-absolute w-100 h-100" style={{ background: "rgba(0,0,0,0.5)" }}></div>
        <div className="container position-relative z-2 py-5">
          <h1 className="display-3 fw-bold mb-3">Style Meets Simplicity</h1>
          <p className="lead mb-4 fs-5">
            Discover Nairobi’s best salons and barbershops home of beauty.  
            Book your next look with just a click.
          </p>
          <Link to="/login" className="btn btn-primary btn-lg px-5 py-3 shadow fw-semibold">
            Book Now
          </Link>
        </div>
      </section>

      {/* ===== Featured Hairstyles Carousel ===== */}
      <section className="py-5 bg-light">
        <div className="container text-center mb-4">
          <h2 className="fw-bold text-primary">Trending Hairstyles</h2>
          <p className="text-muted">Popular looks from top Nairobi stylists</p>
        </div>
        <div
          id="styleCarousel"
          className="carousel slide container"
          data-bs-ride="carousel"
          data-bs-interval="2500"
        >
          <div className="carousel-inner rounded-4 shadow">
            <div className="carousel-item active">
              <img
                src="/static/images/fade.webp"
                className="d-block w-100 rounded-4"
                alt="Classic Fade"
                height="500"
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded-3 p-3">
                <h5>Classic Fade</h5>
                <p>Perfect for the clean, modern man.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="/static/images/braid.webp"
                className="d-block w-100 rounded-4"
                alt="African Braids"
                height="500"
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded-3 p-3">
                <h5>African Braids</h5>
                <p>Elegant styles rooted in culture.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="/static/images/unisex.jpeg"
                className="d-block w-100 rounded-4"
                alt="Unisex Styles"
                height="500"
              />
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded-3 p-3">
                <h5>Unisex Styles</h5>
                <p>Stylish cuts for everyone.</p>
              </div>
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#styleCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#styleCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div>
      </section>

      {/* ===== Why Looksnairobi ===== */}
      <section className="container py-5 text-center">
        <h2 className="fw-bold text-primary mb-4">Why Choose Looksnairobi?</h2>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="p-4 shadow-sm bg-white rounded h-100">
              <i className="bi bi-calendar-check fs-1 text-success mb-3"></i>
              <h4 className="fw-semibold">Easy Bookings</h4>
              <p>Book your haircut or salon service instantly — no waiting in line!</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 shadow-sm bg-white rounded h-100">
              <i className="bi bi-cash-stack fs-1 text-warning mb-3"></i>
              <h4 className="fw-semibold">Transparent Payments</h4>
              <p>We charge only 5% commission — your stylist earns fairly, always.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-4 shadow-sm bg-white rounded h-100">
              <i className="bi bi-star-fill fs-1 text-primary mb-3"></i>
              <h4 className="fw-semibold">Rated & Reviewed</h4>
              <p>All shops are verified and rated by real customers in Nairobi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Call to Action ===== */}
      <section className="text-center text-white py-5" style={{ backgroundColor: "#212529" }}>
        <div className="container">
          <h2 className="fw-bold mb-3">Join the Looksnairobi Movement</h2>
          <p className="mb-4 lead">
            Whether you’re a barber, salon, or customer — we make beauty booking effortless.
          </p>
          <Link to="/register" className="btn btn-lg btn-light fw-semibold px-5 py-3 shadow">
            Get Started
          </Link>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-primary text-white text-center py-4 mt-5">
        <div className="container">
          <p className="mb-3">
            Looksnairobi connects customers with trusted salons and barbers across Kenya.  
            Style, convenience, and trust — all in one platform.
          </p>
          <p className="mb-1">© {new Date().getFullYear()} Looksnairobi. All rights reserved.</p>
          <p>
            <Link to="/privacy" className="text-white me-3">Privacy Policy</Link>
            <Link to="/terms" className="text-white">Terms of Service</Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomeComponent;
