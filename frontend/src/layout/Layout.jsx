import { useContext } from "react";
import { Navbar } from "../components/Navbar/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Layout = () => {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}


export const RequireAuth = () => {
const {currentUser} = useContext(AuthContext);

  return !currentUser ? (<Navigate to="/signin"/>) : (
    currentUser &&
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
