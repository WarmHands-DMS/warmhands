import { useContext } from "react";
import { AdminAuthContext } from "../../context/AuthContext";
import "./Navbar.scss"
import ListIcon from '@mui/icons-material/List';


export const Navbar = () => {
  const { currentAdmin } = useContext(AdminAuthContext);
  console.log(currentAdmin)

  return (
    <div className="navbar">
      <div className="nav-wrapper">
        <ListIcon className="icon"/>
        <div className="admin">
          <img src='/no-avatar.png' alt="profile-pic" />
          <span>{currentAdmin.username}</span>
        </div>
      </div>
    </div>
  );
};
