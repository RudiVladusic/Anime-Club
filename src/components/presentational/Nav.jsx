import { Link } from "react-router-dom";
import { useState } from "react";

const Nav = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  return (
    <>
      <nav>
        <div className="nav-header">
          <Link to="/">Anime Club</Link>
        </div>
        <div className="desktop-nav-links">
          <Link to="/search">Search</Link>

          <Link to="/about">About</Link>

          <Link to="/discover">Discover</Link>
        </div>

        <div
          className={isBurgerOpen ? `burger open` : `burger`}
          onClick={() => {
            setIsNavOpen(!isNavOpen);
            setIsBurgerOpen(!isBurgerOpen);
          }}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </nav>

      <div className={isNavOpen ? `mobile-nav active` : `mobile-nav`}>
        <Link
          onClick={() => {
            setIsNavOpen(!isNavOpen);
            setIsBurgerOpen(!isBurgerOpen);
          }}
          to="/search"
        >
          Search
        </Link>
        <Link
          onClick={() => {
            setIsBurgerOpen(!isBurgerOpen);
            setIsNavOpen(!isNavOpen);
          }}
          to="/about"
        >
          About
        </Link>
        <Link
          onClick={() => {
            setIsBurgerOpen(!isBurgerOpen);
            setIsNavOpen(!isNavOpen);
          }}
          to="/discover"
        >
          Discover
        </Link>
      </div>
    </>
  );
};

export default Nav;
