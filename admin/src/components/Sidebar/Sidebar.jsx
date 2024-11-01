import "./Sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import DisasterIcon from '@mui/icons-material/Flood';
import UserIcon from '@mui/icons-material/Group';
import AdminIcon from '@mui/icons-material/AdminPanelSettings';
import StatIcon from '@mui/icons-material/Assessment';
import EmailIcon from '@mui/icons-material/MarkEmailRead';
import AccountIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/SettingsApplications';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from "react-router-dom";
import apiReq from '../../lib/apiReq';
import { useContext } from "react";
import { AdminAuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from 'react-toastify';


export const Sidebar = () => {
    const { updateAdmin } = useContext(AdminAuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
      try {
        await apiReq.post('/auth/admin/logout');
        updateAdmin(null);
        navigate(`/`, { state: { toastMessage: 'Admin Logout successfully!' } });
      } catch (error) {
        toast.error('Failed to logout');
        console.log(error);
      }
    };

  return (
    <div className="sidebar">
      <div className="top-section">
        <div className="top">
          <Link to={'/'}>
            <img
              className="logo"
              src="/warmhands-logo-full.png"
              alt="logo-warmhands"
            />
          </Link>
        </div>
        <div className="center">
          <ul>
            <p className="title">MAIN</p>
            <Link to={'/'}>
              <li>
                <DashboardIcon className="icon" />
                <span>Dashboard</span>
              </li>
            </Link>
            <Link to={'/stat'}>
              <li>
                <StatIcon className="icon" />
                <span>Stats</span>
              </li>
            </Link>

            <p className="title">LISTS</p>
            <Link to={'/disasters'}>
              <li>
                <DisasterIcon className="icon" />
                <span>Disasters</span>
              </li>
            </Link>
            <Link to={'/users'}>
              <li>
                <UserIcon className="icon" />
                <span>Users</span>
              </li>
            </Link>
            <Link to={'/admins'}>
              <li>
                <AdminIcon className="icon" />
                <span>Admins</span>
              </li>
            </Link>
            <Link to={'/mails'}>
              <li>
                <EmailIcon className="icon" />
                <span>Mails</span>
              </li>
            </Link>

            <p className="title">ACCOUNT</p>
            <li>
              <AccountIcon className="icon" />
              <span>Profile</span>
            </li>
            <li>
              <SettingsIcon className="icon" />
              <span>Settings</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="bottom" onClick={handleLogout}>
        <LogoutIcon className="icon" />
        <span>Logout</span>
      </div>
      <ToastContainer containerId="sidebar" />
    </div>
  );
}
