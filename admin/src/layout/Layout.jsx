import { useContext } from "react";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Navbar } from "../components/Navbar/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { AdminAuthContext } from "../context/AuthContext";
import "./layout.scss"

export const AuthLayout = () => {
  const { currentAdmin } = useContext(AdminAuthContext);

  return !currentAdmin ? (
    <Navigate to="/signin" />
  ) : (
    currentAdmin && (
      <div className="layout">
        <Sidebar />
        <div className="container">
          <Navbar />
          <div className="content">
            <Outlet />
          </div>
        </div>
      </div>
    )
  );
}