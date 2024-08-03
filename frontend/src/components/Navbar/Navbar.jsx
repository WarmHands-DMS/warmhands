import { useState } from "react";
import {Link} from "react-router-dom"

export const Navbar = () => {
  const [open, setOpen] = useState(false)
  const user = false;

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
        {user ? (
          <div className="user-btn">
            <div className="desktop">
              <div className="user">
                <img
                  src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="profile-pic"
                />
                <span>Navindu</span>
              </div>
              <Link className="profile-btn" to="/profile">
                <div className="notification">2</div>
                <span>Profile</span>
              </Link>
            </div>
            <div className="mobile">
              <Link to="/profile" className="user">
                <img
                  src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="profile-pic"
                />
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
          <Link to="/" className="mob-link" onClick={() => setOpen(!open)}>Home</Link>
          <Link to="/news" className="mob-link" onClick={() => setOpen(!open)}>News</Link>
          <Link to="/map" className="mob-link" onClick={() => setOpen(!open)}>Map</Link>
          <Link to="/contact" className="mob-link" onClick={() => setOpen(!open)}>Contact</Link>
          <Link to="signin" className="signin" onClick={() => setOpen(!open)}>
            Sign in
          </Link>
          <Link to="/register" className="register" onClick={() => setOpen(!open)}>
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
