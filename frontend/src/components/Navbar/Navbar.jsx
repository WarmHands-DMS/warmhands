import { useState } from "react";
import {Link} from "react-router-dom"

export const Navbar = () => {
  const [open, setOpen] = useState(false)
  return (
    <nav>
      <div className="left">
        <a href="" className="nav-logo">
          <img className="logo" src="/warmhands-logo-full.png" alt="logo-warmhands" />
        </a>
      </div>
      <div className="right">
        <div className="nav-links">
          <Link className="link" to="/"><a data-item='Home' href="">Home</a></Link>
          <Link className="link" to="/news"><a data-item='News' href="">News</a></Link>
          <Link className="link" to="/map"><a data-item='Map' href="">Map</a></Link>
          <Link className="link" to="/contact"><a data-item='Contact' href="">Contact</a></Link>
        </div>
        <div className="nav-btn">
          <a className="btn-a signin" href="">Sign in</a>
          <a className="btn-a register" href="">Register</a>
        </div>
        <i className={open ? 'hide' : 'fa-solid fa-bars fa-xl mobile-menu show'} onClick={() => setOpen(!open)}></i>
        <i className={!open ? 'hide' : 'fa-solid fa-circle-xmark fa-xl mobile-menu show'} style={{color: "white"}} onClick={() => setOpen(!open)}></i>
        <div className={open ? "menu active" : "menu"}>
          <a href="">Home</a>
          <a href="">News</a>
          <a href="">Map</a>
          <a href="">Contact</a>
          <a href="" className="signin">Sign in</a>
          <a href="" className="register">Register</a>
        </div>
      </div>
    </nav>
  );
}
