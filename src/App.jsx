import PreLogin from "./pages/auth/PreLogin";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import { Routes, Route } from "react-router";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PreLogin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
