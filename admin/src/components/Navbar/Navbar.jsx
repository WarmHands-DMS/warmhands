import "./Navbar.scss"
import ListIcon from '@mui/icons-material/List';


export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="wrapper">
        <ListIcon className="icon"/>
        <div className="admin">
          <img src='/no-avatar.png' alt="profile-pic" />
          <span>Admin</span>
        </div>
      </div>
    </div>
  );
};
