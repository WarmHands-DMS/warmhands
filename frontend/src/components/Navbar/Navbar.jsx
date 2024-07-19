export const Navbar = () => {
  return (
    <nav>
      <div className="left">
        <a href="" className="nav-logo">
          <img className="logo" src="/warmhands-logo-full.png" alt="logo-warmhands" />
        </a>
        <a href="">Home</a>
        <a href="">News</a>
        <a href="">Map</a>
        <a href="">Contact</a>
      </div>
      <div className="right">
        <a className="signin" href="">Sign in</a>
        <a className="register" href="">Register</a>
      </div>
    </nav>
  );
}
