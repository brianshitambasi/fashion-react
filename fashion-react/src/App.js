import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🧠 Context
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoutes";

// 🌍 Public Components
import HomeComponent from "./components/HomeComponent";
import AboutComponent from "./components/AboutComponent";
import RegisterComponent from "./components/RegisterComponents";
import LoginComponent from "./components/LoginComponents";
import NotAuthorized from "./components/NotAuthorized";
import NotFound from "./components/NotFound";

// 🧭 Navbar
import NavBar from "./components/NavBar";

// 🧑‍💼 Admin
import AdminDashboard from "./components/admin/AdminDashboard";

// 🏪 Shop Owner Components
import ShopLayout from "./components/shopowner/ShopLayout";
import ShopDash from "./components/shopowner/ShopDash";
import CreateShop from "./components/shopowner/CreateShop";
import AllShops from "./components/shopowner/AllShops";
import SingleShop from "./components/shopowner/SingleShop";
import EditShop from "./components/shopowner/EditShop";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="d-flex flex-column min-vh-100">
          {/* 🔝 Navbar (hidden inside dashboard layout) */}
          <NavBar />

          {/* 🧭 App Content */}
          <main className="flex-grow-1 mt-4">
            <div className="container-fluid px-3 px-md-5">
              <Routes>
                {/* 🌍 Public Routes */}
                <Route path="/" element={<HomeComponent />} />
                <Route path="/about" element={<AboutComponent />} />
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/register" element={<RegisterComponent />} />
                <Route path="/not-authorized" element={<NotAuthorized />} />
                <Route path="/not-found" element={<NotFound />} />

                {/* 🛍️ Public Shop Pages */}
                <Route path="/shops" element={<AllShops />} />
                <Route path="/shop/:id" element={<SingleShop />} />

                {/* 🧩 Admin Dashboard */}
                <Route
                  path="/admin/dashboard"
                  element={
                    <ProtectedRoute allowedRoles={["admin"]}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                {/* 🏪 Shop Owner Area */}
                <Route
                  path="/shopowner/*"
                  element={
                    <ProtectedRoute allowedRoles={["shop"]}>
                      <ShopLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<ShopDash />} />
                  <Route path="create" element={<CreateShop />} />
                  <Route path="shops" element={<AllShops />} />
                  <Route path="shop/:id" element={<SingleShop />} />
                  <Route path="edit/:id" element={<EditShop />} />
                </Route>

                {/* ✅ Direct Redirect Route for Login */}
                <Route
                  path="/shopowner-dashboard"
                  element={
                    <ProtectedRoute allowedRoles={["shop"]}>
                      <ShopLayout>
                        <ShopDash />
                      </ShopLayout>
                    </ProtectedRoute>
                  }
                />

                {/* 🚫 Fallback Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </main>

          {/* 🦶 Optional Footer */}
          <footer className="bg-light py-3 text-center mt-auto">
            <small className="text-muted">
              © {new Date().getFullYear()} Looks Nairobi — All Rights Reserved
            </small>
          </footer>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
