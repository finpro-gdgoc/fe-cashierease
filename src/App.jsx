import PreLogin from "./pages/auth/PreLogin";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import Statistic from "./pages/statistic/Statistic";
import ShopConfigure from "./pages/configure/ShopConfigure";

import { Routes, Route, Navigate } from "react-router";
import { isAuthenticated, getRole } from "./services/auth";

function RequireAuth({ children }) {
  if (!isAuthenticated()) return <Navigate to="/" replace />;
  return children;
}

function AdminOnly({ children }) {
  if (getRole() !== "admin") return <Navigate to="/dashboard" replace />;
  return children;
}

function PublicOnly({ children }) {
  if (isAuthenticated()) return <Navigate to="/dashboard" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicOnly>
            <PreLogin />
          </PublicOnly>
        }
      />
      <Route
        path="/login"
        element={
          <PublicOnly>
            <Login />
          </PublicOnly>
        }
      />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/statistic"
        element={
          <RequireAuth>
            <Statistic />
          </RequireAuth>
        }
      />
      <Route
        path="/shopconfigure"
        element={
          <RequireAuth>
            <AdminOnly>
              <ShopConfigure />
            </AdminOnly>
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
