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

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top-section">
        <div className="top">
          <img
            className="logo"
            src="/warmhands-logo-full.png"
            alt="logo-warmhands"
          />
        </div>
        <div className="center">
          <ul>
            <p className="title">MAIN</p>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
            <li>
              <StatIcon className="icon" />
              <span>Stats</span>
            </li>

            <p className="title">LISTS</p>
            <li>
              <DisasterIcon className="icon" />
              <span>Disasters</span>
            </li>
            <li>
              <UserIcon className="icon" />
              <span>Users</span>
            </li>
            <li>
              <AdminIcon className="icon" />
              <span>Admins</span>
            </li>
            <li>
              <EmailIcon className="icon" />
              <span>Mails</span>
            </li>

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
      <div className="bottom">
        <LogoutIcon className="icon" />
        <span>Logout</span>
      </div>
    </div>
  );
}
