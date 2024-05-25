import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import ForgotPassword from "../components/ForgotPassword/ForgotPassword";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes