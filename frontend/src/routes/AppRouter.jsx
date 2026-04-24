import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

// Pages
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import Home from "../pages/Home.jsx";
import Landing from "../pages/Landing.jsx";

import MainLayout from "../layouts/MainLayout.jsx";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* MAIN LAYOUT — all pages nested here get Navbar + Footer */}
        <Route element={<MainLayout />}>
          {/* Public */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Landing />
              </PublicRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          {/* Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />


          {/* Fallback */}
          <Route path="*" element={<div className="text-white">404</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
