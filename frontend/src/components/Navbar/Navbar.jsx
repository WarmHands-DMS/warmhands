import { useState, useContext } from "react";
import {Link} from "react-router-dom"
import {AuthContext} from "../../context/AuthContext";

export const Navbar = () => {
  const [open, setOpen] = useState(false)

  const { currentUser } = useContext(AuthContext);
  

  return (
    <nav>
      <div className="left">
        <Link to="/" className="nav-logo">
          <img
            className="logo"
            src="/warmhands-logo-full.png"
            alt="logo-warmhands"
          />
        </Link>
      </div>
      <div className="right">
        <div className="nav-links">
          <Link className="link" to="/" data-item="Home">
            Home
          </Link>
          <Link className="link" to="/news" data-item="News">
            News
          </Link>
          <Link className="link" to="/map" data-item="Map">
            Map
          </Link>
          <Link className="link" to="/contact" data-item="Contact">
            Contact
          </Link>
        </div>
        {currentUser ? (
          <div className="user-btn">
            <div className="desktop">
              <div className="user">
                <img src={currentUser.avatar ||"/no-avatar.png"} alt="profile-pic" />
                <span>{currentUser.fname}</span>
              </div>
              <Link className="profile-btn" to="/profile">
                <div className="notification">2</div>
                <span>Profile</span>
              </Link>
            </div>
            <div className="mobile">
              <Link to="/profile" className="user">
                <img src={currentUser.avatar ||"/no-avatar.png"} alt="profile-pic" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="nav-btn">
            <Link className="link btn-a signin" to="/signin">
              Sign in
            </Link>
            <Link className="link btn-a register" to="/register">
              Register
            </Link>
          </div>
        )}
        <i
          className={open ? 'hide' : 'fa-solid fa-bars fa-xl mobile-menu show'}
          onClick={() => setOpen(!open)}
        ></i>
        <i
          className={
            !open ? 'hide' : 'fa-solid fa-circle-xmark fa-xl mobile-menu show'
          }
          style={{ color: 'white' }}
          onClick={() => setOpen(!open)}
        ></i>
        <div className={open ? 'menu active' : 'menu'}>
          <Link to="/" className="mob-link" onClick={() => setOpen(!open)}>
            Home
          </Link>
          <Link to="/news" className="mob-link" onClick={() => setOpen(!open)}>
            News
          </Link>
          <Link to="/map" className="mob-link" onClick={() => setOpen(!open)}>
            Map
          </Link>
          <Link
            to="/contact"
            className="mob-link"
            onClick={() => setOpen(!open)}
          >
            Contact
          </Link>
          <Link to="signin" className="signin" onClick={() => setOpen(!open)}>
            Sign in
          </Link>
          <Link
            to="/register"
            className="register"
            onClick={() => setOpen(!open)}
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
